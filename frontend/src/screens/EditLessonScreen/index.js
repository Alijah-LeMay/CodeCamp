import React, { useState, useEffect } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_LESSON_RESET } from '../../store/constants/lessonConstants'
// My Components
import CenterContainer from '../../components/CenterContainer'
import MyButton from '../../components/MyButton'
import FormField from '../../components/FormField'

// Assets
import classes from './EditLessonScreen.module.css'

import {
  getLessonDetails,
  updateLesson,
} from '../../store/actions/lessonActions'

// Other
import { LanguageOptions } from './FormOptions'

const EditLessonScreen = (props) => {
  const { match, history } = props
  const lessonId = match.params.id
  const dispatch = useDispatch()

  const lessonDetails = useSelector((state) => state.lessonDetails)
  const { lesson } = lessonDetails

  const lessonUpdate = useSelector((state) => state.lessonUpdate)
  const { success: successUpdate } = lessonUpdate

  const [formState, setFormState] = useState({
    title: '',
    language: '',
    description: '',
    markDown: '',
    initialCode: '',
    matchCode: '',
    index: '',
    max: '',
  })
  const formConfig = {
    title: {
      type: 'input',
      config: { type: 'text', placeholder: 'Lesson Title' },
    },
    language: {
      type: 'select',
      config: {
        type: 'text',
        placeholder: 'Language',
        options: LanguageOptions,
      },
    },
    description: {
      type: 'input',
      config: { type: 'text', placeholder: 'Lesson Description' },
    },
    markDown: {
      type: 'input',
      config: { type: 'text', placeholder: 'Lesson markDown' },
    },
    initialCode: {
      type: 'input',
      config: { type: 'text', placeholder: 'Lesson initialCode' },
    },
    matchCode: {
      type: 'input',
      config: { type: 'text', placeholder: 'Lesson matchCode' },
    },
    index: {
      type: 'input',
      config: { type: 'text', placeholder: 'Lesson Index' },
    },
    max: {
      type: 'input',
      config: { type: 'text', placeholder: 'Lesson Max' },
    },
  }
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_LESSON_RESET })
      history.push('/admin')
    } else {
      if (!lesson || lessonId !== lesson._id) {
        dispatch(getLessonDetails(lessonId))
      } else {
        setFormState({
          title: lesson.title,
          language: lesson.language,
          description: lesson.description,
          markDown: lesson.markDown,
          initialCode: lesson.initialCode,
          matchCode: lesson.matchCode,
          index: lesson.index,
          max: lesson.max,
        })
      }
    }
  }, [dispatch, history, lessonId, successUpdate, lesson])

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
  // const imagesArray = []
  // for (let key in image) {
  //   imagesArray.push(image[key])
  // }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateLesson({
        _id: lessonId,
        user: lesson.user,
        title: formState.title,
        language: formState.language,
        description: formState.description,
        markDown: formState.markDown,
        initialCode: formState.initialCode,
        matchCode: formState.matchCode,
        index: formState.index,
        max: formState.max,
      })
    )
  }

  return (
    <div className={classes.screen_container}>
      <CenterContainer>
        <MyButton
          content='Go Back'
          to='/admin'
          outMargin='15px'
          direction='left'
        />
        {lesson && (
          <div>
            <MyButton
              content='View Post'
              to={`/lesson/${lesson._id}`}
              outMargin='15px'
              direction='left'
            />
          </div>
        )}
        <h2>Edit Lesson</h2>

        <form onSubmit={submitHandler}>
          <p>ID: {lesson && lesson._id}</p>
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

export default EditLessonScreen
