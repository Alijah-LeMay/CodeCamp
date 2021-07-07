import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'

import {
  createCourse,
  deleteCourse,
  getCourses,
} from '../../store/actions/courseActions'

import { CREATE_COURSE_RESET } from '../../store/constants/courseConstants'

// My Components
import DetailList from '../../components/DetailList'
import MyButton from '../../components/Button'
import Loader from '../../components/Loader'
import Table from '../../components/Table'
import TBody from '../../components/TBody'
import Tr from '../../components/Tr'
import Td from '../../components/Td'

const CourseListContainer = (props) => {
  const { history } = props
  const dispatch = useDispatch()

  const courseCreate = useSelector((state) => state.courseCreate)
  const {
    loading: loadingCreateCourse,
    success: successCreateCourse,
    course: createdCourse,
  } = courseCreate

  const courseList = useSelector((state) => state.courseList)
  const { loading: loadingCourses, courses } = courseList

  const courseDelete = useSelector((state) => state.courseDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    // error: errorDelete,
  } = courseDelete

  const createCourseHandler = () => {
    dispatch(createCourse())
  }

  const deleteCourseHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCourse(id))
    }
  }
  useEffect(() => {
    dispatch({
      type: CREATE_COURSE_RESET,
    })

    dispatch(getCourses())

    if (successCreateCourse) {
      history.push(`/admin/course/${createdCourse._id}/edit`)
    }
  }, [dispatch, history, successCreateCourse, createdCourse, successDelete])

  return (
    <div>
      <h2>Upload A Course</h2>

      <MyButton
        content='Create A Course'
        variant='func'
        to={createCourseHandler}
        outMargin='15px'
        direction='left'
      />
      <MyButton
        content='Go To Courses'
        outMargin='15px'
        direction='left'
        to='/courses'
      />
      {loadingCreateCourse ? <Loader /> : null}
      {loadingCourses ? (
        <Loader />
      ) : (
        <div>
          <h2>Existing Courses</h2>
          <Table fixed>
            <TBody>
              {courses ? (
                courses.map((item, idx) => (
                  <DetailList
                    key={idx}
                    label='Existing Courses'
                    content={item}
                    editLoc='course'
                    buttons={[
                      {
                        link: item._id,
                        content: 'Edit',
                      },
                      {
                        variant: 'func',
                        to: () => deleteCourseHandler(item._id),
                        content: 'Del',
                      },
                    ]}
                  />
                ))
              ) : (
                <Tr>
                  <Td>
                    <Loader />
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
          {loadingDelete ? <Loader /> : null}
        </div>
      )}
    </div>
  )
}

export default withRouter(CourseListContainer)
