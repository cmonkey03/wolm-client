import {LOAD_API_DATA} from '../actions';

const initialState = []

const usersReducers = (state=initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return action.payload.users
    default:
      return state
  }
}

export default usersReducers
