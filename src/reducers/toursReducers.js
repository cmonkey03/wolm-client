import {LOAD_API_DATA} from '../actions';

const initialState = []

const toursReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return action.payload.tours
    default:
    return state
  }
}

export default toursReducers
