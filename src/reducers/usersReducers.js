import {LOAD_API_DATA} from '../types';
import {SET_CURRENT_USER} from '../types';
import {AUTHENTICATING_USER} from '../types';
import {FAILED_LOGIN} from '../types';

const initialState = {
  users: [],
  user: null,
  loggedIn: false,
  authenticatingUser:false,
  failedLogin: false,
  error: null
}

const usersReducers = (state=initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return { ...state, users: action.payload.users }
    case SET_CURRENT_USER:
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }
    case AUTHENTICATING_USER:
      return { ...state, authenticatingUser: true }
    case FAILED_LOGIN:
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    default:
      return state
  }
}

export default usersReducers;
