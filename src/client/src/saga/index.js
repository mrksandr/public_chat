import io from 'socket.io-client';
import axios from 'axios';
import { eventChannel, delay } from 'redux-saga';
import {
  fork,
  take,
  call,
  put,
  cancel,
  all,
  takeLatest,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  SIGN_IN,
  SIGN_OUT,
  ADD_USER,
  REMOVE_USER,
  NEW_MESSAGE,
  SEND_MESSAGE,
  FETCH_MESSAGES,
  REQUEST,
  START,
  SUCCESS,
  FAIL,
} from '../AC';

import {
  addUser,
  removeUser,
  newMessage,
  sendMessage,
  fetchUsers,
  fetchMessagesRequest,
} from '../AC';

const fetchMessagesApi = () =>
  axios
    .get('/api/v1/posts', {
      headers: {
        Accept: 'application/json',
      },
    })
    .then(request => request.data.posts)
    .catch(err => {
      throw err;
    });

const postMessagesApi = message =>
  axios
    .post('/api/v1/posts', message)
    .then(request => request.data.post)
    .catch(err => {
      throw err;
    });

function connect() {
  const socket = io();
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
      console.log('connect');
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', ({ user }) => {
      emit(addUser({ user }));
    });

    socket.on('users.logout', ({ user }) => {
      emit(removeUser({ user }));
    });

    socket.on('users.fetch', ({ users }) => {
      console.log('users.fetch', users);
      emit(fetchUsers({ users }));
    });

    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {});
    return () => {};
  });
}

function* read(socket) {
  let channel;
  try {
    channel = yield call(subscribe, socket);
  } catch (e) {
    console.log(e);
  }

  while (true) {
    console.log(action, '------------------------------');
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take('SEND_MESSAGE');
    socket.emit('message', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    let { payload } = yield take('SIGN_IN');

    const socket = yield call(connect);
    socket.emit('login', { username: payload.username }, err => {
      if (err) alert(err);
    });
    console.log('fetchmessage');
    yield put(fetchMessagesRequest());
    /*
    yield put({
      action: FETCH_MESSAGES,

    });*/

    yield put(push('/chat/'));

    const task = yield fork(handleIO, socket);

    let action = yield take('SIGN_OUT');

    yield cancel(task);

    socket.emit('logout', { username: payload.username });
    yield put(push('/'));
  }
}

function* fetchMessagesSaga() {
  yield put({
    type: FETCH_MESSAGES + START,
  });

  try {
    const messages = yield call(fetchMessagesApi);

    yield put({
      type: FETCH_MESSAGES + SUCCESS,
      payload: { messages },
    });
  } catch (err) {
    yield put({
      type: FETCH_MESSAGES + FAIL,
      error: err.message,
    });
  }
}

function* postmessageSaga(action) {
  yield put({
    type: NEW_MESSAGE + START,
  });

  try {
    const message = yield call(postMessagesApi, { ...action.payload.message });

    yield put({
      type: NEW_MESSAGE + SUCCESS,
      payload: { message },
    });
  } catch (err) {
    yield put({
      type: NEW_MESSAGE + FAIL,
      error: err.message,
    });
  }
}

export default function* rootSaga() {
  yield fork(flow);
  yield all([takeLatest(FETCH_MESSAGES + REQUEST, fetchMessagesSaga)]);
  yield all([takeLatest(NEW_MESSAGE, postmessageSaga)]);
}
