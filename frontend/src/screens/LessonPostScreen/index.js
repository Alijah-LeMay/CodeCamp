import React, { useEffect, useState } from 'react'
import CenterContainer from '../../components/CenterContainer'
import ReactMarkdown from 'react-markdown'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  getLessonDetails,
  updateLesson,
} from '../../store/actions/lessonActions'

// My Components
import Loader from '../../components/Loader'
import MyButton from '../../components/MyButton'
import { MyEditor } from '../../components/AceEditor'

// Assets
import classes from './LessonPostScreen.module.css'
import {
  createUserLesson,
  getUserLessonDetails,
  updateUserLesson,
} from '../../store/actions/userLessonActions'
const LessonPostScreen = (props) => {
  const { match, history } = props
  const lessonId = match.params.id
  const dispatch = useDispatch()

  const [formState, setFormState] = useState('')

  const lessonDetails = useSelector((state) => state.lessonDetails)
  const { loading: loadingLesson, lesson } = lessonDetails

  const userLessonDetails = useSelector((state) => state.userLessonDetails)

  const { loading: loadingUserLesson, userLesson } = userLessonDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const inputChangedHandler = (e) => {
    setFormState(e)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (!userLesson) {
      dispatch(createUserLesson({ lesson: lessonId }))
    }
    dispatch(
      updateUserLesson({
        _id: lessonId,
        authorLesson: lessonId,
        initialCode: formState,
        completed: true,
      })
    )
  }

  useEffect(() => {
    if (!lesson || lessonId !== lesson._id) {
      dispatch(getLessonDetails(lessonId))
      dispatch(getUserLessonDetails(lessonId))
    }
    if (!userLesson) {
      setFormState(lesson.initialCode)
    } else {
      setFormState(userLesson.initialCode)
    }
  }, [dispatch, history, lessonId, lesson, userLesson])
  return (
    <div className={classes.screen_container}>
      <h2>Lesson: {lesson && lesson.title}</h2>
      {loadingLesson ? (
        <Loader />
      ) : (
        <>
          <p>
            {lesson.index}/{lesson.max}
          </p>
          <p>{lesson.language}</p>
          <CenterContainer>
            <MyEditor
              language={lesson.language}
              onChange={inputChangedHandler}
              value={formState}
            />
            <button onClick={submitHandler}>Submit</button>
          </CenterContainer>
        </>
      )}
    </div>
  )
}

export default LessonPostScreen
