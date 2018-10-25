import {LOAD_API_DATA} from '../types';
import {CREATING_USER} from '../types';
import {CREATED_USER} from '../types';
import {AUTHENTICATING_USER} from '../types';
import {UNMOUNT_USER_FORM} from '../types';
import {UPDATING_USER} from '../types';
import {UPDATED_USER} from '../types';
import {SET_CURRENT_USER} from '../types';
import {LOGOUT_USER} from '../types';
import {FAILED_SIGNUP} from '../types';
import {FAILED_LOGIN} from '../types';
import {FAILED_UPDATE} from '../types';

const initialState = {
  users: [],
  user: null,
  creatingUser: false,
  createSuccess: false,
  authenticatingUser: false,
  updatingUser: false,
  updateSuccess: false,
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
    case CREATED_USER:
      return {...state, creatingUser: false, createSuccess: true}
    case AUTHENTICATING_USER:
      return { ...state, authenticatingUser: true }
    case UPDATING_USER:
      return { ...state, updatingUser: true }
    case UPDATED_USER:
      return {...state, failedUpdate: false, updateSuccess: true}
    case SET_CURRENT_USER:
      return { ...state,
        user: action.payload,
        loggedIn: true,
        creatingUser: false,
        authenticatingUser: false,
        updatingUser: false,
      }
    case UNMOUNT_USER_FORM:
      return {...state,
        creatingUser: false,
        createSuccess: false,
        authenticatingUser: false,
        updatingUser: false,
        updateSuccess: false,
        failedSignup: false,
        failedLogin: false,
        failedUpdate: false,
        error: null
      }
    case LOGOUT_USER:
      return {...state, loggedIn: false}
    case FAILED_SIGNUP:
      return {
        ...state,
        creatingUser: false,
        failedSignup: true,
        authenticatingUser: false,
        error: action.payload
      }
    case FAILED_LOGIN:
      return {
        ...state,
        failedLogin: true,
        authenticatingUser: false,
        error: action.payload
      }
    case FAILED_UPDATE:
      return {
        ...state,
        failedUpdate: true,
        updatingUser: false,
        authenticatingUser: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default usersReducers;
