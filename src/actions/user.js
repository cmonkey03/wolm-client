import { AUTHENTICATING_USER } from '../types';
import { SET_CURRENT_USER } from '../types';
import { FAILED_LOGIN } from '../types';
import ApiAdapter from '../adapter';

const Adapter = new ApiAdapter()

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })

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
      dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user })
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

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData
})

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER })
