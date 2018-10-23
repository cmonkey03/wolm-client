import {LOAD_API_DATA} from '../types';
import {MAKING_RESERVATION} from '../types';
import {MAKE_RESERVATION} from '../types';

const initialState = {
  reservations: [],
  makingReservation: false,
  confirmedReservation: false
}

const reservationsReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return action.payload.reservations
    case MAKING_RESERVATION:
      return { ...state, makingReservation: true, confirmedReservation: false }
    case MAKE_RESERVATION:
      return { ...state, makingReservation: false, confirmedReservation: true }
    default:
    return state
  }
}

export default reservationsReducers;
