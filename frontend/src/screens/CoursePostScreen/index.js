import React, { useEffect } from 'react'
import CenterContainer from '../../components/CenterContainer'
import ReactMarkdown from 'react-markdown'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../../store/actions/courseActions'
import { getUserLessons } from '../../store/actions/userLessonActions'

// Assets
import classes from './CoursePostScreen.module.css'
import Loader from '../../components/Loader'
import MyButton from '../../components/MyButton'

const CoursePostScreen = (props) => {
  const { match, history } = props
  const courseId = match.params.id
  const dispatch = useDispatch()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading: loadingCourse, course } = courseDetails

  const userLessonList = useSelector((state) => state.userLessonList)
  const { loading: loadingUserLessons, userLessons } = userLessonList

  useEffect(() => {
    if (!course || courseId !== course._id) {
      dispatch(getCourseDetails(courseId))
    } else {
      course.lessons && dispatch(getUserLessons(course.lessons))
    }
  }, [dispatch, history, courseId, course])

  return (
    <div className={classes.screen_container}>
      <CenterContainer>
        {loadingCourse ? (
          <Loader />
        ) : (
          <div>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>{course.language}</p>
            <p>{course.curriculum}</p>
            <p>{course.availability}</p>
            <ReactMarkdown children={course.markDown} />

            <h3> Lessons</h3>
            {loadingUserLessons ? (
              <Loader />
            ) : (
              userLessons.map((item) => {
                if (item.completed === false)
                  return (
                    <div key={item._id}>
                      <p>{item.title}</p>
                      <p>{item.description}</p>
                      <p>{String(item.completed)}</p>
                      <MyButton
                        content='Open'
                        styleVariant='clear'
                        bgHoverColor='lightgrey'
                        hoverColor='grey'
                        outMargin='5px'
                        to={`/lesson/${item._id}`}
                      />
                    </div>
                  )
              })
            )}
            <h3>Completed Lessons</h3>
            {loadingUserLessons ? (
              <Loader />
            ) : (
              userLessons.map((item) => {
                if (item.completed === true) {
                  return (
                    <div key={item._id}>
                      <p>{item.title}</p>
                      <p>{item.description}</p>
                      <p>{String(item.completed)}</p>
                      <MyButton
                        content='Open'
                        styleVariant='clear'
                        bgHoverColor='lightgrey'
                        hoverColor='grey'
                        outMargin='5px'
                        to={`/lesson/${item._id}`}
                      />
                    </div>
                  )
                }
              })
            )}
          </div>
        )}
      </CenterContainer>
    </div>
  )
}

export default CoursePostScreen
