import {LOAD_API_DATA} from '../types';
import {MAKING_RESERVATION} from '../types';
import {MAKE_RESERVATION} from '../types';
import {CANCEL_RESERVATION} from '../types';
import {CANCELLING_RESERVATION} from '../types';
import {UNMOUNT_MAKE_RESERVATION} from '../types';

const initialState = {
  reservations: [],
  makingReservation: false,
  successMessage: null,
  confirmedTour: null,
  cancellingReservation: false
}

const reservationsReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return {...state, reservations: action.payload.reservations}
    case MAKING_RESERVATION:
      return { ...state, makingReservation: true, confirmedReservation: false }
    case MAKE_RESERVATION:
      return { ...state,
        makingReservation: false,
        successMessage: action.payload.message,
        confirmedTour: action.payload.tour
      }
    case CANCEL_RESERVATION:
      return { ...state, cancellingReservation: false}
    case CANCELLING_RESERVATION:
      return { ...state, cancellingReservation: true }
    case UNMOUNT_MAKE_RESERVATION:
      return {
        ...state,
        makingReservation: false,
        successMessage: null,
        confirmedTour: null,
        cancellingReservation: false
      }
    default:
      return state
  }
}

export default reservationsReducers;
