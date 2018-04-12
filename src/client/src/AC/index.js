export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const FETCH_USERS = 'FETCH_USERS';

export const NEW_MESSAGE = 'NEW_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';

export const REQUEST = '_REQUEST';
export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';

export function signIn(username) {
  return {
    type: SIGN_IN,
    payload: { username },
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function fetchUsers({ users }) {
  return {
    type: FETCH_USERS,
    payload: { users },
  };
}

export function addUser({ user }) {
  return {
    type: ADD_USER,
    payload: { user },
  };
}

export function removeUser({ user }) {
  console.log('remove_user AC', user);
  return {
    type: REMOVE_USER,
    payload: { user },
  };
}

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    payload: message,
  };
}
export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    payload: message,
  };
}

export function fetchMessagesRequest(message) {
  return {
    type: FETCH_MESSAGES + REQUEST,
  };
}
