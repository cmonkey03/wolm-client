import {LOAD_API_DATA} from '../actions';

const initialState = []

const reservationsReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return action.payload.reservations
    default:
    return state
  }
}

export default reservationsReducers
