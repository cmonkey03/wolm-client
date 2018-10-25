import {CREATING_TOUR} from '../types';
import {CREATE_TOUR} from '../types';
import {FAILED_CREATE_TOUR} from '../types';
import {UNMOUNT_TOUR} from '../types';
import ApiAdapter from '../adapter';

const Adapter = new ApiAdapter()

export const createTour = (tourObj) => {
  return (dispatch) => {
    dispatch(creatingTour())

    Adapter.createTour(tourObj)
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
    .then(JSONResponse => {
      dispatch(createdTour(JSONResponse))
      })
    .catch(r => r.json()
    .then(e => dispatch({ type: FAILED_CREATE_TOUR, payload: e.errors })))
  }
}

export const unmountTour = () => {
  return (dispatch) => {
    dispatch({ type: UNMOUNT_TOUR })
  }
}

const creatingTour = () => ({ type: CREATING_TOUR })
const createdTour = (payload) => ({
  type: CREATE_TOUR,
  payload
})
