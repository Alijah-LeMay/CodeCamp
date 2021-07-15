import React, { useState, useEffect } from 'react'

import { Container, Col, Row } from 'react-bootstrap'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import CenterContainer from '../../components/CenterContainer'
import Loader from '../../components/Loader'

import { getCourses } from '../../store/actions/courseActions'
// Assets
import classes from './CoursesScreen.module.css'
// My Components

import MyButton from '../../components/MyButton'

const CoursesScreen = (props) => {
  const { history } = props
  const dispatch = useDispatch()

  const courseList = useSelector((state) => state.courseList)
  const { loading: loadingCourses, courses } = courseList

  useEffect(() => {
    dispatch(getCourses())
  }, [dispatch])
  return (
    <div className={classes.screen_container}>
      <CenterContainer>
        <Container>
          {loadingCourses ? (
            <Loader />
          ) : (
            <Row>
              {courses.map((item) => {
                return (
                  <div className={classes.card} key={item._id}>
                    <img src={item.images[0]} alt={item.images[0]} />
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <p>{item.language}</p>
                    <MyButton
                      content='Start Course'
                      outMargin='5px'
                      direction='middle'
                      to={`/course/${item._id}`}
                    />
                  </div>
                )
              })}
            </Row>
          )}
        </Container>
      </CenterContainer>
    </div>
  )
}

export default CoursesScreen
