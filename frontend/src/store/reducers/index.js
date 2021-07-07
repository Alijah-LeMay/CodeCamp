import { combineReducers } from 'redux'
import { captchaReducer } from './captchaReducers'
import {
  courseCreateReducer,
  courseListReducer,
  courseDetailsReducer,
  courseDeleteReducer,
  courseUpdateReducer,
} from './courseReducers'
import { userLoginReducer } from './userReducers'

export default combineReducers({
  userLogin: userLoginReducer,
  captcha: captchaReducer,
  courseCreate: courseCreateReducer,
  courseList: courseListReducer,
  courseDetails: courseDetailsReducer,
  courseDelete: courseDeleteReducer,
  courseUpdate: courseUpdateReducer,
})
