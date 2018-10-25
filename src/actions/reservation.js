import {MAKING_RESERVATION} from '../types';
import {MAKE_RESERVATION} from '../types';
import {CANCEL_RESERVATION} from '../types';
import {CANCELLING_RESERVATION} from '../types';
import {RENDER_RESERVED_TOUR} from '../types';
import {RENDER_DELETE_RESERVATION} from '../types';
import {UNMOUNT_MAKE_RESERVATION} from '../types';
import ApiAdapter from '../adapter';

const Adapter = new ApiAdapter()

export const createReservation = (reservationObj) => {
  return (dispatch) => {
    dispatch(makingReservation())

    Adapter.createReservation(reservationObj)
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
    .then(JSONResponse => {
      dispatch(makeReservation(JSONResponse))
      dispatch(renderReservation(JSONResponse))
    })
    // .catch(r => r.json()
    // .then(e => {
    //   // dispatch()
    // }))
  }
}

export const cancelReservation = (reservationObj) => {
  return (dispatch) => {
    dispatch(cancellingReservation())

    Adapter.cancelReservation(reservationObj)
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
    .then(JSONResponse => {
      dispatch(deleteReservation(JSONResponse))
      dispatch(renderDeleteReservation(reservationObj))
    })
    // .catch(r => r.json()
    // .then(e => {
    //   // dispatch()
    // }))
  }
}

export const unmountMakeReservation = () => {
  return (dispatch) => {
    dispatch({ type: UNMOUNT_MAKE_RESERVATION })
  }
}

const makingReservation = () => ({ type: MAKING_RESERVATION })
const makeReservation = (payload) => ({
  type: MAKE_RESERVATION,
  payload
})
const cancellingReservation = () => ({ type: CANCELLING_RESERVATION})
const deleteReservation = (payload) => ({
  type: CANCEL_RESERVATION,
  payload
})
const renderReservation = (payload) => ({
  type: RENDER_RESERVED_TOUR,
  payload
})
const renderDeleteReservation = (payload) => ({
  type: RENDER_DELETE_RESERVATION,
  payload
})
