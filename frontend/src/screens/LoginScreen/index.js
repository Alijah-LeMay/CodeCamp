import React, { useState, useEffect } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actions/userActions'

// My Components
import CenterContainer from '../../components/CenterContainer'
import FormField from '../../components/FormField'
import MyButton from '../../components/MyButton'

// Assets
import classes from './LoginScreen.module.css'

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formConfig = {
    email: {
      type: 'input',
      config: { type: 'email', placeholder: 'Your Email' },
    },
    password: {
      type: 'input',
      config: { type: 'text', placeholder: 'Your password' },
    },
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
    console.log(formState.email, formState.password)
    dispatch(login(formState.email, formState.password))
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history.push('/admin')
    }
  }, [userInfo, history])

  return (
    <div className={classes.screen_container}>
      <CenterContainer>
        <form onSubmit={submitHandler}>
          <h2>Administrator Login</h2>
          {formElements.map((formElement) => (
            <FormField
              key={formElement.id}
              type={formElement.setup.type}
              config={formElement.setup.config}
              value={formElement.value}
              changed={(event) => inputChangedHandler(event, formElement.id)}
            />
          ))}
          <MyButton content='Submit' variant='submit' />
        </form>
      </CenterContainer>
    </div>
  )
}

export default LoginScreen
