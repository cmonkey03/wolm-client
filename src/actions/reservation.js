import {MAKING_RESERVATION} from '../types';
import {MAKE_RESERVATION} from '../types';
import {CANCEL_RESERVATION} from '../types';
import {CANCELLING_RESERVATION} from '../types';
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
      })
    .catch(r => r.json()
    .then(e => {
      // dispatch()
    }))
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
      })
    .catch(r => r.json()
    .then(e => {
      // dispatch()
    }))
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