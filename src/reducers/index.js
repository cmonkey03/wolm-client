import { combineReducers } from 'react';
import users from './usersReducers';
import tours from './toursReducers';
import users from './reservationsReducers';

export default combineReducers({
  users,
  tours,
  reservations
})
