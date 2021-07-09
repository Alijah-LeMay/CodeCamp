import React, { useEffect } from 'react'
import CenterContainer from '../../components/CenterContainer'
import ReactMarkdown from 'react-markdown'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getLessonDetails } from '../../store/actions/lessonActions'

// My Components
import Loader from '../../components/Loader'
import MyButton from '../../components/Button'
import { MyEditor } from '../../components/AceEditor'

// Assets
import classes from './LessonPostScreen.module.css'
const LessonPostScreen = (props) => {
  const { match, history } = props
  const lessonId = match.params.id
  const dispatch = useDispatch()

  const lessonDetails = useSelector((state) => state.lessonDetails)
  const { loading: loadingLesson, lesson } = lessonDetails

  const lessonUpdate = useSelector((state) => state.lessonUpdate)
  const { success: successUpdate } = lessonUpdate

  useEffect(() => {
    if (!lesson || lessonId !== lesson._id) {
      dispatch(getLessonDetails(lessonId))
    }
  }, [dispatch, history, lessonId, lesson])
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
          <CenterContainer>
            <MyEditor />
          </CenterContainer>
        </>
      )}
    </div>
  )
}

export default LessonPostScreen
