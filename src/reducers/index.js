import { combineReducers } from 'redux';
import users from './usersReducers';
import tours from './toursReducers';
import reservations from './reservationsReducers';

export default combineReducers({
  users,
  tours,
  reservations
})
