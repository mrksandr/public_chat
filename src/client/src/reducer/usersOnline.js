import { ADD_USER, REMOVE_USER, FETCH_USERS } from '../AC';
import { arrToMap } from './utils';

const initialState = {
  entities: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.user.id]: payload.user,
        },
      };

    case FETCH_USERS:
      return {
        ...state,
        entities: arrToMap(payload.users),
      };

    case REMOVE_USER:
      const newUser = { ...state.entities };
      delete newUser[payload.user.id];
      return { ...state, entities: newUser };

    default:
      return state;
  }
};
