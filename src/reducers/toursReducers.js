import {LOAD_API_DATA} from '../types';
import {CREATING_TOUR} from '../types';
import {CREATE_TOUR} from '../types';
import {FAILED_CREATE_TOUR} from '../types';
import {UNMOUNT_TOUR} from '../types';
import {LOAD_TOURS} from '../types';

const initialState = {
  tours: [],
  creatingTour: false,
  tourSuccess: false,
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
      return {
        ...state,
        creatingTour: false,
        tourSuccess: true
      }
    case FAILED_CREATE_TOUR:
      return {
        ...state,
        creatingTour: false,
        failedCreateTour: true,
        error: action.payload }
    case UNMOUNT_TOUR:
      return {
        ...state,
        creatingTour: false,
        failedCreateTour: false,
        tourSuccess: false,
        error: null
      }

    case LOAD_TOURS:
      return {
        ...state,
        tours: action.payload
      }
    default:
      return state
  }
}

export default toursReducers;
