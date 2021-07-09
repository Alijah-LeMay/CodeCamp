import React, { useEffect } from 'react'
import CenterContainer from '../../components/CenterContainer'
import ReactMarkdown from 'react-markdown'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetails } from '../../store/actions/courseActions'
import { getMultiLessonDetails } from '../../store/actions/lessonActions'

// Assets
import classes from './CoursePostScreen.module.css'
import Loader from '../../components/Loader'
import MyButton from '../../components/Button'

const CoursePostScreen = (props) => {
  const { match, history } = props
  const courseId = match.params.id
  const dispatch = useDispatch()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading: loadingCourse, course } = courseDetails

  const multiLessonDetails = useSelector((state) => state.multiLessonDetails)
  const { loading: loadingLessons, lessons } = multiLessonDetails

  useEffect(() => {
    if (!course || courseId !== course._id) {
      dispatch(getCourseDetails(courseId))
    } else {
      {
        course.lessons && dispatch(getMultiLessonDetails(course.lessons))
      }
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
            <ReactMarkdown source={course.markDown} />
            <h3>Lessons</h3>
            {loadingLessons ? (
              <Loader />
            ) : (
              lessons.map((item) => {
                return (
                  <div key={item._id}>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <MyButton
                      content='Open'
                      outMargin='5px'
                      direction='middle'
                      to={`/lesson/${item._id}`}
                    />
                  </div>
                )
              })
            )}
          </div>
        )}
      </CenterContainer>
    </div>
  )
}

export default CoursePostScreen
