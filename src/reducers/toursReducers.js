import {LOAD_API_DATA} from '../types';
import {CREATING_TOUR} from '../types';
import {CREATE_TOUR} from '../types';
import {FAILED_CREATE_TOUR} from '../types';

const initialState = {
  tours: [],
  creatingTour: false,
  failedCreateTour: false,
  error: null
}

const toursReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_API_DATA:
      return {...state, tours: action.payload.tours}
    case CREATING_TOUR:
      return {
        ...state,
        creatingTour: true,
        failedCreateTour: false
      }
    case CREATE_TOUR:
      return {...state, creatingTour: false, }
    case FAILED_CREATE_TOUR:
      return {
        ...state,
        creatingTour: false,
        failedCreateTour: true,
        error: action.payload }
    default:
      return state
  }
}

export default toursReducers;
