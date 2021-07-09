import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'

import {
  createLesson,
  deleteLesson,
  getLessons,
} from '../../store/actions/lessonActions'

import { CREATE_LESSON_RESET } from '../../store/constants/lessonConstants'

// My Components
import DetailList from '../../components/DetailList'
import MyButton from '../../components/Button'
import Loader from '../../components/Loader'
import Table from '../../components/Table'
import TBody from '../../components/TBody'
import Tr from '../../components/Tr'
import Td from '../../components/Td'

const LessonListContainer = (props) => {
  const { history } = props
  const dispatch = useDispatch()

  const lessonCreate = useSelector((state) => state.lessonCreate)
  const {
    loading: loadingCreateLesson,
    success: successCreateLesson,
    lesson: createdLesson,
  } = lessonCreate

  const lessonList = useSelector((state) => state.lessonList)
  const { loading: loadingLessons, lessons } = lessonList

  const lessonDelete = useSelector((state) => state.lessonDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    // error: errorDelete,
  } = lessonDelete

  const createLessonHandler = () => {
    dispatch(createLesson())
  }

  const deleteLessonHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteLesson(id))
    }
  }
  useEffect(() => {
    dispatch({
      type: CREATE_LESSON_RESET,
    })

    dispatch(getLessons())

    if (successCreateLesson) {
      history.push(`/admin/lesson/${createdLesson._id}/edit`)
    }
  }, [dispatch, history, successCreateLesson, createdLesson, successDelete])

  return (
    <div>
      <h2>Upload A Lesson</h2>

      <MyButton
        content='Create A Lesson'
        variant='func'
        to={createLessonHandler}
        outMargin='15px'
        direction='left'
      />
      <MyButton
        content='Go To Lessons'
        outMargin='15px'
        direction='left'
        to='/lesson'
      />
      {loadingCreateLesson ? <Loader /> : null}
      {loadingLessons ? (
        <Loader />
      ) : (
        <div>
          <h2>Existing Lessons</h2>
          <Table fixed>
            <TBody>
              {lessons ? (
                lessons.map((item, idx) => (
                  <DetailList
                    key={idx}
                    label='Existing Lessons'
                    content={item}
                    editLoc='lesson'
                    buttons={[
                      {
                        link: item._id,
                        content: 'Edit',
                      },
                      {
                        variant: 'func',
                        to: () => deleteLessonHandler(item._id),
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

export default withRouter(LessonListContainer)
