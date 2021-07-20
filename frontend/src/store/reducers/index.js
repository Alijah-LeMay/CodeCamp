import { combineReducers } from 'redux'
import { captchaReducer } from './captchaReducers'
import {
  courseCreateReducer,
  courseListReducer,
  courseDetailsReducer,
  courseDeleteReducer,
  courseUpdateReducer,
} from './courseReducers'
import {
  lessonCreateReducer,
  lessonListReducer,
  lessonDetailsReducer,
  lessonDeleteReducer,
  lessonUpdateReducer,
  multiLessonDetailsReducer,
} from './lessonReducers'
import {
  userLessonCreateReducer,
  userLessonListReducer,
  userLessonDetailsReducer,
  multiUserLessonDetailsReducer,
} from './userLessonReducers'
import { userLoginReducer } from './userReducers'

export default combineReducers({
  userLogin: userLoginReducer,
  captcha: captchaReducer,

  lessonCreate: lessonCreateReducer,
  lessonList: lessonListReducer,
  lessonDetails: lessonDetailsReducer,
  multiLessonDetails: multiLessonDetailsReducer,
  lessonDelete: lessonDeleteReducer,
  lessonUpdate: lessonUpdateReducer,

  userLessonCreate: userLessonCreateReducer,
  userLessonList: userLessonListReducer,
  userLessonDetails: userLessonDetailsReducer,
  multiUserLessonDetails: multiUserLessonDetailsReducer,
  // lessonUserDelete: lessonUserDeleteReducer,
  // lessonUserUpdate: lessonUserUpdateReducer,

  courseCreate: courseCreateReducer,
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  courseDelete: courseDeleteReducer,
  courseUpdate: courseUpdateReducer,
})
