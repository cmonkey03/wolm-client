import {LOAD_API_DATA} from '../types';
import {CREATING_USER} from '../types';
import {AUTHENTICATING_USER} from '../types';
import {UPDATING_USER} from '../types';
import {SET_CURRENT_USER} from '../types';
import {LOGOUT_USER} from '../types';
import {FAILED_SIGNUP} from '../types';
import {FAILED_LOGIN} from '../types';
import {FAILED_UPDATE} from '../types';

const initialState = {
  users: [],
  user: null,
  creatingUser: false,
  authenticatingUser: false,
  updatingUser: false,
  loggedIn: false,
  failedSignup: false,
  failedLogin: false,
  failedUpdate: false,
  error: null
}

const usersReducers = (state=initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return { ...state, users: action.payload.users }
    case CREATING_USER:
      return { ...state, creatingUser: true}
    case AUTHENTICATING_USER:
      return { ...state, authenticatingUser: true }
    case UPDATING_USER:
      return { ...state, updatingUser: true }
    case SET_CURRENT_USER:
      return { ...state,
        user: action.payload,
        loggedIn: true,
        creatingUser: false,
        authenticatingUser: false,
        updatingUser: false,
      }
    case LOGOUT_USER:
      return {...state, loggedIn: false}
    case FAILED_SIGNUP:
      return {
        ...state,
        failedSignup: true,
        error: action.payload,
        authenticatingUser: false
      }
    case FAILED_LOGIN:
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    case FAILED_UPDATE:
      return {
        ...state,
        failedUpdate: true,
        error: action.payload,
        updatingUser: false,
        authenticatingUser: false
      }
    default:
      return state
  }
}

export default usersReducers;
