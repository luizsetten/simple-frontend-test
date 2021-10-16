import { combineReducers } from 'redux';
import { reducer as routesReducer } from '../Routes';
import { default as home } from './home.reducer';
import { default as user } from './user.reducer';

export default combineReducers({
  location: routesReducer,
  home,
  user,
});
