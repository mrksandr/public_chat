import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import messages from './messages';
import usersOnline from './usersOnline';

export default combineReducers({
  router: routerReducer,
  auth,
  messages,
  usersOnline,
});
