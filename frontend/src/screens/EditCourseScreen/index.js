import React, { useState, useEffect } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// My Components
import CenterContainer from '../../components/CenterContainer'
import MyButton from '../../components/Button'
import FormField from '../../components/FormField'

// Assets
import classes from './EditCourseScreen.module.css'
import { UPDATE_COURSE_RESET } from '../../store/constants/courseConstants'
import {
  getCourseDetails,
  updateCourse,
} from '../../store/actions/courseActions'

const EditCourseScreen = (props) => {
  const { match, history } = props
  const courseId = match.params.id
  const dispatch = useDispatch()

  const [image, setImage] = useState([])

  const courseDetails = useSelector((state) => state.courseDetails)
  const { course } = courseDetails

  const courseUpdate = useSelector((state) => state.courseUpdate)
  const { success: successUpdate } = courseUpdate

  const [formState, setFormState] = useState({
    title: '',
    language: '',
    curriculum: '',
  })
  const formConfig = {
    title: {
      type: 'input',
      config: { type: 'text', placeholder: 'Course Title' },
    },
    language: {
      type: 'input',
      config: { type: 'text', placeholder: 'Course Language' },
    },
    curriculum: {
      type: 'input',
      config: { type: 'text', placeholder: 'Course Curriculum' },
    },
  }
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_COURSE_RESET })
      history.push('/admin')
    } else {
      if (!course || courseId !== course._id) {
        dispatch(getCourseDetails(courseId))
      } else {
        setFormState({
          title: course.title,
          language: course.language,
          curriculum: course.curriculum,
        })
        // set Lessons
        setImage(course.files)
      }
    }
  }, [dispatch, history, courseId, successUpdate, course])

  // Prepare formState objects
  const formElements = []
  for (let key in formState) {
    formElements.push({
      id: key,
      setup: formConfig[key],
      value: formState[key],
    })
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    formElements.forEach((formElement) => {
      if (inputIdentifier === formElement.id) {
        setFormState({
          ...formState,
          [inputIdentifier]: event.target.value,
        })
      }
    })
  }
  const imagesArray = []
  for (let key in image) {
    imagesArray.push(image[key])
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCourse({
        _id: courseId,
        title: formState.title,
        language: formState.language,
        curriculum: formState.curriculum,
        videos: formState.videos,
      })
    )
  }

  return (
    <div className={classes.screen_container}>
      <CenterContainer>
        {course && (
          <div>
            <MyButton
              content='View Post'
              to={`/course/${course._id}`}
              outMargin='15px'
              direction='left'
            />
            {console.log('lessons - ', course.lessons)}
          </div>
        )}
        <h2>Edit Course</h2>
        <form onSubmit={submitHandler}>
          {formElements.map((formElement) => (
            <FormField
              key={formElement.id}
              type={formElement.setup.type}
              config={formElement.setup.config}
              value={formElement.value}
              changed={(event) => inputChangedHandler(event, formElement.id)}
            />
          ))}

          <MyButton
            content='Submit'
            variant='submit'
            outMargin='15px'
            direction='right'
          />
        </form>
      </CenterContainer>
    </div>
  )
}

export default EditCourseScreen
