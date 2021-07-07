import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_RESET,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  UPDATE_COURSE_RESET,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
} from '../constants/courseConstants'

export const courseCreateReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return { loading: true, course: {} }
    case CREATE_COURSE_SUCCESS:
      return { loading: false, success: true, course: action.payload }
    case CREATE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_COURSE_RESET:
      return {}
    default:
      return state
  }
}

export const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case GET_COURSES_REQUEST:
      return { loading: true, courses: [] }
    case GET_COURSES_SUCCESS:
      return { loading: false, courses: action.payload }
    case GET_COURSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { loading: true, ...state }
    case COURSE_DETAILS_SUCCESS:
      return { loading: false, success: true, course: action.payload }
    case COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const courseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
      return { loading: true }
    case DELETE_COURSE_SUCCESS:
      return { loading: false, success: true }
    case DELETE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const courseUpdateReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case UPDATE_COURSE_REQUEST:
      return { loading: true, course: {} }
    case UPDATE_COURSE_SUCCESS:
      return { loading: false, success: true, course: action.payload }
    case UPDATE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_COURSE_RESET:
      return { course: {} }
    default:
      return state
  }
}
