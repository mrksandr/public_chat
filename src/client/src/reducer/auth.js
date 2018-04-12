import { SIGN_IN, SIGN_OUT } from '../AC';
const initialState = {
  username: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        username: payload.username,
      };

    case SIGN_OUT:
      return {
        ...state,
        username: null,
      };

    default:
      return state;
  }
};
