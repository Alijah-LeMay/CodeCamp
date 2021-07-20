import {
  GET_USER_LESSONS_REQUEST,
  GET_USER_LESSONS_SUCCESS,
  GET_USER_LESSONS_FAIL,
  CREATE_USER_LESSON_REQUEST,
  CREATE_USER_LESSON_SUCCESS,
  CREATE_USER_LESSON_FAIL,
  CREATE_USER_LESSON_RESET,
  USER_LESSON_DETAILS_REQUEST,
  USER_LESSON_DETAILS_SUCCESS,
  USER_LESSON_DETAILS_FAIL,
  MULTI_USER_LESSON_DETAILS_REQUEST,
  MULTI_USER_LESSON_DETAILS_SUCCESS,
  MULTI_USER_LESSON_DETAILS_FAIL,
  UPDATE_USER_LESSON_REQUEST,
  UPDATE_USER_LESSON_SUCCESS,
  UPDATE_USER_LESSON_FAIL,
  UPDATE_USER_LESSON_RESET,
  DELETE_USER_LESSON_REQUEST,
  DELETE_USER_LESSON_SUCCESS,
  DELETE_USER_LESSON_FAIL,
} from '../constants/userLessonConstants'

export const userLessonCreateReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case CREATE_USER_LESSON_REQUEST:
      return { loading: true, userLesson: {} }
    case CREATE_USER_LESSON_SUCCESS:
      return { loading: false, success: true, userLesson: action.payload }
    case CREATE_USER_LESSON_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_USER_LESSON_RESET:
      return {}
    default:
      return state
  }
}

export const userLessonListReducer = (state = { userLessons: [] }, action) => {
  switch (action.type) {
    case GET_USER_LESSONS_REQUEST:
      return { loading: true, userLessons: [] }
    case GET_USER_LESSONS_SUCCESS:
      return { loading: false, userLessons: action.payload, success: true }
    case GET_USER_LESSONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const userLessonDetailsReducer = (
  state = { userLesson: {} },
  action
) => {
  switch (action.type) {
    case USER_LESSON_DETAILS_REQUEST:
      return { loading: true, ...state }
    case USER_LESSON_DETAILS_SUCCESS:
      return { loading: false, success: true, userLesson: action.payload }
    case USER_LESSON_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const userLessonUpdateReducer = (state = { userLesson: {} }, action) => {
  switch (action.type) {
    case UPDATE_USER_LESSON_REQUEST:
      return { loading: true, userLesson: {} }
    case UPDATE_USER_LESSON_SUCCESS:
      return { loading: false, success: true, userLesson: action.payload }
    case UPDATE_USER_LESSON_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_USER_LESSON_RESET:
      return { userLesson: {} }
    default:
      return state
  }
}
export const multiUserLessonDetailsReducer = (
  state = { lessons: [] },
  action
) => {
  switch (action.type) {
    case MULTI_USER_LESSON_DETAILS_REQUEST:
      return { loading: true, ...state }
    case MULTI_USER_LESSON_DETAILS_SUCCESS:
      return { loading: false, success: true, lessons: action.payload }
    case MULTI_USER_LESSON_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
