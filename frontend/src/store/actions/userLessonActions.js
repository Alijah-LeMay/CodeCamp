import axios from 'axios'
import {
  GET_USER_LESSONS_REQUEST,
  GET_USER_LESSONS_SUCCESS,
  GET_USER_LESSONS_FAIL,
  CREATE_USER_LESSON_REQUEST,
  CREATE_USER_LESSON_SUCCESS,
  CREATE_USER_LESSON_FAIL,
  USER_LESSON_DETAILS_REQUEST,
  USER_LESSON_DETAILS_SUCCESS,
  USER_LESSON_DETAILS_FAIL,
  MULTI_USER_LESSON_DETAILS_REQUEST,
  MULTI_USER_LESSON_DETAILS_FAIL,
  MULTI_USER_LESSON_DETAILS_SUCCESS,
  UPDATE_USER_LESSON_REQUEST,
  UPDATE_USER_LESSON_SUCCESS,
  UPDATE_USER_LESSON_FAIL,
} from '../constants/userLessonConstants'

export const createUserLesson = (lesson) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_USER_LESSON_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/userLesson', lesson, config)

    dispatch({
      type: CREATE_USER_LESSON_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_USER_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserLessons = (ids) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_LESSONS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/userLesson', config)

    const userLessonIdsArray = []

    for (let i in data) {
      userLessonIdsArray.push(data[i].lesson)
    }

    let lessonsData = []

    for (let item in ids) {
      const { data } = await axios.get(`/api/lesson/${ids[item]}`, {}, config)
      lessonsData.push(data)
    }

    for (let lesson in lessonsData) {
      for (let id in data) {
        if (lessonsData[lesson]._id === userLessonIdsArray[id]) {
          lessonsData[lesson].completed = data[id].completed
          lessonsData[lesson].initialCode = data[id].initialCode
        }
      }
    }

    console.log('lessonsData - ', lessonsData)

    dispatch({
      type: GET_USER_LESSONS_SUCCESS,
      payload: lessonsData,
    })
  } catch (error) {
    dispatch({
      type: GET_USER_LESSONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserLessonDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_LESSON_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/userLesson/${id}`)

    dispatch({
      type: USER_LESSON_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LESSON_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getMultiUserLessonDetails =
  (ids, completedIds) => async (dispatch, getState) => {
    try {
      dispatch({ type: MULTI_USER_LESSON_DETAILS_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      let lessonsData = []
      for (let item in ids) {
        const { data } = await axios.get(
          `/api/userLesson/${ids[item]}`,
          completedIds,
          config
        )
        lessonsData.push(data)
      }
      dispatch({
        type: MULTI_USER_LESSON_DETAILS_SUCCESS,
        payload: lessonsData,
      })
    } catch (error) {
      dispatch({
        type: MULTI_USER_LESSON_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateUserLesson = (lesson) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_LESSON_REQUEST })

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
      `/api/userLesson/${lesson._id}`,
      lesson,
      config
    )

    dispatch({
      type: UPDATE_USER_LESSON_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_LESSON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
