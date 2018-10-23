import {LOAD_API_DATA} from '../types';

const initialState = {
  tours: [],
  makingReservation: false,
  confirmedReservation: false
}

const toursReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return {...state, tours: action.payload.tours}
    default:
    return state
  }
}

export default toursReducers;
