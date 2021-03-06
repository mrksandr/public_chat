import io from 'socket.io-client';
import axios from 'axios';
import { eventChannel } from 'redux-saga';
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
  fetchUsers,
  // fetchMessagesRequest,
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
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const action = yield take(SEND_MESSAGE + SUCCESS);
    const { message } = action.payload;
    socket.emit('message', message);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    let { payload } = yield take(SIGN_IN);

    const socket = yield call(connect);
    socket.emit('login', { username: payload.username }, err => {
      if (err) alert(err);
    });

    yield put(push('/chat/'));

    const task = yield fork(handleIO, socket);

    yield take(SIGN_OUT);

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
    console.log(err.message);
    yield put({
      type: FETCH_MESSAGES + FAIL,
      error: { load: err.message },
    });
  }
}

function* postmessageSaga(action) {
  const { message } = action.payload;
  yield put({
    type: SEND_MESSAGE + START,
  });

  try {
    const requestMessage = yield call(postMessagesApi, message);

    yield put({
      type: SEND_MESSAGE + SUCCESS,
      payload: { message: requestMessage },
    });
  } catch (err) {
    yield put({
      type: SEND_MESSAGE + FAIL,
      error: err.response.data.message,
    });
  }
}

export default function* rootSaga() {
  yield fork(flow);
  yield all([takeLatest(FETCH_MESSAGES + REQUEST, fetchMessagesSaga)]);
  yield all([takeLatest(SEND_MESSAGE + REQUEST, postmessageSaga)]);
}
