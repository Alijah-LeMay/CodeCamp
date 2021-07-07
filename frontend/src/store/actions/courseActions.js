import axios from 'axios'
import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
} from '../constants/courseConstants'

export const createCourse = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/course', {}, config)

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COURSES_REQUEST })

    const { data } = await axios.get('/api/course')

    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/course/${id}`)

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_COURSE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/course/${id}`, config)

    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCourse = (course) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_COURSE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/course/${course._id}`,
      course,
      config
    )

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
