import { combineReducers } from 'redux';
import auth from './auth';
import search from './search';
import permissions from './permissions';

export default combineReducers({
  auth,
  search,
  permissions,
});
