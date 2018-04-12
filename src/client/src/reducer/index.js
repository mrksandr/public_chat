import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import chat from './chat';

export default combineReducers({
  router: routerReducer,
  auth,
  chat,
});
