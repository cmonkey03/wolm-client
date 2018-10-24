import { CREATING_USER } from '../types';
import { CREATED_USER } from '../types';
import { AUTHENTICATING_USER } from '../types';
import { UPDATING_USER } from '../types';
import { SET_CURRENT_USER } from '../types';
import { LOGOUT_USER } from '../types';
import { FAILED_SIGNUP } from '../types';
import { FAILED_LOGIN } from '../types';
import { FAILED_UPDATE } from '../types';
import ApiAdapter from '../adapter';

const Adapter = new ApiAdapter()

export const createUser = (userObj) => {
  return (dispatch) => {
    dispatch(creatingUser())

    Adapter.createUser(userObj)
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
    .then(JSONResponse => {
      dispatch(createdUser())
      })
    .catch(r => r.json()
    .then(e => dispatch({ type: FAILED_SIGNUP, payload: e.errors })))
  }
}

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch(authenticatingUser())

    Adapter.loginUser(username, password)
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
    .then(JSONResponse => {
      localStorage.setItem('jwt', JSONResponse.jwt)
      dispatch(setCurrentUser(JSONResponse.user))
      })
    .catch(r => r.json()
    .then(e => dispatch({ type: FAILED_LOGIN, payload: e.message })))
  }
}

export const fetchCurrentUser = () => {
  return (dispatch) => {
    dispatch(authenticatingUser())
    Adapter.fetchCurrentUser()
    .then(JSONResponse => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const updateUser = (userObj) => {
  return (dispatch) => {
    dispatch(updatingUser())

    Adapter.updateUser(userObj)
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
    .then(JSONResponse => {
      dispatch(setCurrentUser(JSONResponse.user))
      })
    .catch(r => r.json()
    .then(e => dispatch({ type: FAILED_UPDATE, payload: e.error })))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('jwt');
    dispatch({ type: LOGOUT_USER })
  }
}

export const setCurrentUser = (userObj) => ({
  type: SET_CURRENT_USER,
  payload: userObj
})

const creatingUser = () => ({ type: CREATING_USER })
const createdUser = () => ({ type: CREATED_USER })
const authenticatingUser = () => ({ type: AUTHENTICATING_USER })
const updatingUser = () => ({ type: UPDATING_USER })
