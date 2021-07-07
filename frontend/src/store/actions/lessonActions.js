import axios from 'axios'
import {
  GET_LESSONS_REQUEST,
  GET_LESSONS_SUCCESS,
  GET_LESSONS_FAIL,
  CREATE_LESSON_REQUEST,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAIL,
  LESSON_DETAILS_REQUEST,
  LESSON_DETAILS_SUCCESS,
  LESSON_DETAILS_FAIL,
  UPDATE_LESSON_REQUEST,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
  DELETE_LESSON_REQUEST,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAIL,
} from '../constants/lessonConstants'

export const createLesson = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_LESSON_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/lesson', {}, config)

    dispatch({
      type: CREATE_LESSON_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getLessons = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LESSONS_REQUEST })

    const { data } = await axios.get('/api/lesson')

    dispatch({
      type: GET_LESSONS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_LESSONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getLessonDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LESSON_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/lesson/${id}`)

    dispatch({
      type: LESSON_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LESSON_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteLesson = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_LESSON_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/course/lesson/${id}`, config)

    dispatch({
      type: DELETE_LESSON_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateLesson = (lesson) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_LESSON_REQUEST })

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
      `/api/course/lesson/${lesson._id}`,
      lesson,
      config
    )

    dispatch({
      type: UPDATE_LESSON_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
