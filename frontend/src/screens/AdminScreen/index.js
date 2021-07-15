import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/actions/userActions'

// My Components
import MyButton from '../../components/MyButton'

import CourseListContainer from './CourseListContainer'

// assets
import classes from './AdminScreen.module.css'
import LessonListContainer from './LessonListContainer'

const AdminScreen = (props) => {
  const { history } = props
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])
  return (
    <div className={classes.screen_container}>
      <Container fluid>
        <Row>
          <Col>
            <MyButton
              content='Logout'
              variant='func'
              to={logoutHandler}
              outMargin='15px'
              direction='left'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CourseListContainer />
            <LessonListContainer />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminScreen
