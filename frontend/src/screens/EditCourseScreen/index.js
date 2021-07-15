import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Redux
import { useDispatch, useSelector } from 'react-redux'

import {
  getCourseDetails,
  updateCourse,
} from '../../store/actions/courseActions'
import { getMultiLessonDetails } from '../../store/actions/lessonActions'
import { UPDATE_COURSE_RESET } from '../../store/constants/courseConstants'

// My Components
import CenterContainer from '../../components/CenterContainer'
import MyButton from '../../components/MyButton'
import FormField from '../../components/FormField'

import Loader from '../../components/Loader'
// Assets
import classes from './EditCourseScreen.module.css'
// Other
import { LanguageOptions, AvailabilityOptions } from './FormOptions'

const EditCourseScreen = (props) => {
  const { match, history } = props
  const courseId = match.params.id
  const dispatch = useDispatch()

  const [image, setImage] = useState([])
  const [uploading, setUploading] = useState(false)

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading: loadingCourse, course } = courseDetails

  const multiLessonDetails = useSelector((state) => state.multiLessonDetails)
  const { lessons } = multiLessonDetails

  const courseUpdate = useSelector((state) => state.courseUpdate)
  const { success: successUpdate } = courseUpdate

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    markDown: '',
    language: '',
    curriculum: '',
    availability: '',
    lessons: '',
  })
  const formConfig = {
    title: {
      type: 'input',
      config: { type: 'text', placeholder: 'Course Title' },
    },
    description: {
      type: 'input',
      config: { type: 'text', placeholder: 'Course description' },
    },
    markDown: {
      type: 'input',
      config: { type: 'text', placeholder: 'Course markdown' },
    },
    language: {
      type: 'select',
      config: {
        type: 'text',
        placeholder: 'Language',
        options: LanguageOptions,
      },
    },
    curriculum: {
      type: 'input',
      config: { type: 'text', placeholder: 'Course Curriculum' },
    },
    availability: {
      type: 'select',
      config: {
        type: 'text',
        placeholder: 'Availability',
        options: AvailabilityOptions,
      },
    },
    lessons: {
      type: 'input',
      config: { type: 'text', placeholder: 'Course Lessons' },
    },
  }

  const imagesArray = []
  for (let key in image) {
    imagesArray.push(image[key])
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      imagesArray.push(data)
      setImage(imagesArray)
      setUploading(false)
    } catch (error) {
      console.error(error)
      console.log(error)
      setUploading(false)
    }
  }
  const imageDeleteHandler = (id) => {
    const imageIndex = image.indexOf(id)
    image.splice(imageIndex, 1)
    console.log(imageIndex)
  }

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

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCourse({
        _id: courseId,
        title: formState.title,
        description: formState.description,
        markDown: formState.markDown,
        language: formState.language,
        curriculum: formState.curriculum,
        availability: formState.availability,
        lessons: formState.lessons.split(','),
        images: image,
      })
    )
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
          description: course.description,
          markDown: course.markDown,
          language: course.language,
          curriculum: course.curriculum,
          availability: course.availability,
          lessons: course.lessons,
        })
        setImage(course.images)

        course.lessons && dispatch(getMultiLessonDetails(course.lessons))

        // set Lessons
      }
    }
  }, [dispatch, history, courseId, successUpdate, course])

  return (
    <div className={classes.screen_container}>
      <CenterContainer>
        <MyButton
          content='Go Back'
          to='/admin'
          outMargin='15px'
          direction='middle'
        />
        <h2>Edit Course</h2>
        {loadingCourse ? (
          <Loader />
        ) : (
          <>
            <MyButton
              content='View Post'
              to={`/course/${course._id}`}
              outMargin='15px'
              direction='middle'
            />
            <form onSubmit={submitHandler}>
              <div>
                {image.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <img src={item} style={{ width: '100px' }} alt={item} />
                      <MyButton
                        content='del'
                        variant='func'
                        to={() => imageDeleteHandler(item)}
                      />
                    </div>
                  )
                })}
                <input type='file' onChange={uploadFileHandler} name={image} />
                {uploading && <div>...loading...</div>}
                <MyButton content='Submit' variant='submit' />
              </div>
              {formElements.map((formElement) => (
                <FormField
                  key={formElement.id}
                  type={formElement.setup.type}
                  config={formElement.setup.config}
                  value={formElement.value}
                  changed={(event) =>
                    inputChangedHandler(event, formElement.id)
                  }
                />
              ))}
              {lessons.length > 0 &&
                lessons.map((item, idx) => (
                  <div key={idx}>
                    {item.title}
                    <p>{item._id}</p>
                    <p>
                      {item.index} / {item.max}
                    </p>
                    <MyButton
                      content='View Post'
                      to={`/lesson/${item}`}
                      outMargin='15px'
                      direction='middle'
                    />
                    <MyButton
                      content='Edit Post'
                      to={`/admin/lesson/${item._id}/edit`}
                      outMargin='15px'
                      direction='middle'
                    />
                  </div>
                ))}

              <MyButton
                content='Submit'
                variant='submit'
                outMargin='15px'
                direction='right'
              />
            </form>
          </>
        )}
      </CenterContainer>
    </div>
  )
}

export default EditCourseScreen
