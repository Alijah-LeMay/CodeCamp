import {
  GET_LESSONS_REQUEST,
  GET_LESSONS_SUCCESS,
  GET_LESSONS_FAIL,
  CREATE_LESSON_REQUEST,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAIL,
  CREATE_LESSON_RESET,
  LESSON_DETAILS_REQUEST,
  LESSON_DETAILS_SUCCESS,
  LESSON_DETAILS_FAIL,
  UPDATE_LESSON_REQUEST,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
  UPDATE_LESSON_RESET,
  DELETE_LESSON_REQUEST,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAIL,
} from '../constants/lessonConstants'

export const lessonCreateReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case CREATE_LESSON_REQUEST:
      return { loading: true, lesson: {} }
    case CREATE_LESSON_SUCCESS:
      return { loading: false, success: true, lesson: action.payload }
    case CREATE_LESSON_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_LESSON_RESET:
      return {}
    default:
      return state
  }
}

export const lessonListReducer = (state = { lessons: [] }, action) => {
  switch (action.type) {
    case GET_LESSONS_REQUEST:
      return { loading: true, lessons: [] }
    case GET_LESSONS_SUCCESS:
      return { loading: false, lessons: action.payload }
    case GET_LESSONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const lessonDetailsReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case LESSON_DETAILS_REQUEST:
      return { loading: true, ...state }
    case LESSON_DETAILS_SUCCESS:
      return { loading: false, success: true, lesson: action.payload }
    case LESSON_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const lessonDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LESSON_REQUEST:
      return { loading: true }
    case DELETE_LESSON_SUCCESS:
      return { loading: false, success: true }
    case DELETE_LESSON_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const lessonUpdateReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case UPDATE_LESSON_REQUEST:
      return { loading: true, lesson: {} }
    case UPDATE_LESSON_SUCCESS:
      return { loading: false, success: true, lesson: action.payload }
    case UPDATE_LESSON_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_LESSON_RESET:
      return { lesson: {} }
    default:
      return state
  }
}
