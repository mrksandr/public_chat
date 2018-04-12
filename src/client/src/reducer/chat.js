import {
  ADD_USER,
  REMOVE_USER,
  NEW_MESSAGE,
  FETCH_MESSAGES,
  FETCH_USERS,
  SUCCESS,
} from '../AC';
import { arrToMap } from './utils';

const initialState = {
  usersOnline: {},
  messages: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER:
      console.log(action);
      return {
        ...state,
        usersOnline: {
          ...state.usersOnline,
          [payload.user.id]: payload.user,
        },
      };

    case FETCH_USERS:
      console.log('FETCH_USERS');
      return {
        ...state,
        usersOnline: arrToMap(payload.users),
      };

    case REMOVE_USER:
      const newUser = { ...state.usersOnline };
      delete newUser[payload.user.id];
      return { ...state, usersOnline: newUser };

    case NEW_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [payload.message.id]: payload.message,
        },
      };
    case FETCH_MESSAGES + SUCCESS:
      console.log(payload);
      return {
        ...state,
        messages: arrToMap(payload.messages),
      };

    default:
      return state;
  }
};
