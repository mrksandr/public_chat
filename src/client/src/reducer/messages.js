import {
  FETCH_MESSAGES,
  SEND_MESSAGE,
  NEW_MESSAGE,
  START,
  FAIL,
  SUCCESS,
} from '../AC';
import { arrToMap } from './utils';

const initialState = {
  entities: {},
  errors: null,
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case FETCH_MESSAGES + START:
      return {
        ...state,
        errors: null,
        loading: true,
      };

    case FETCH_MESSAGES + SUCCESS:
      return {
        ...state,
        entities: arrToMap(payload.messages),
        loading: false,
      };
    case FETCH_MESSAGES + FAIL:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          ...error,
        },
      };

    case SEND_MESSAGE + START:
      return {
        ...state,
        errors: null,
      };

    case SEND_MESSAGE + FAIL:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...error,
        },
      };

    case NEW_MESSAGE:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.message.id]: payload.message,
        },
      };

    default:
      return state;
  }
};
