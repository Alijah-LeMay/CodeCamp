import classes from './PopUp.module.css'
import React, { useState, useEffect } from 'react'

// My Components
import Backdrop from '../Backdrop'
import MyButton from '../Button'
import { withRouter } from 'react-router'

const PopUp = (props) => {
  const { delay, immediate, close, history } = props
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!immediate) {
      const popUpTimer = setTimeout(
        () => {
          setIsActive(true)
          console.log('Popup Active')
          clearTimeout(popUpTimer)
        },
        delay ? delay * 1000 : 3000
      )
    } else {
      setIsActive(true)
    }
  }, [])

  const closeHandler = () => {
    setIsActive(false)
  }
  const goHomeHandler = () => {
    setIsActive(false)
    history.push('/')
  }

  return (
    <>
      {isActive ? (
        <div>
          <div className={classes.popup_container}>
            <div className={classes.body}>
              {props.children}
              {close ? (
                <div className={classes.button_container}>
                  <MyButton
                    content='Go Home'
                    to={goHomeHandler}
                    variant='func'
                    styleVariant='clear'
                    hoverColor='#4bb781'
                    direction='left'
                  />
                </div>
              ) : null}
            </div>
            <div className={classes.closeButton} onClick={closeHandler}>
              <i
                className='fas fa-times'
                style={{ fontSize: '1.2rem', color: 'black' }}
              ></i>
            </div>
            <Backdrop show={isActive} clicked={closeHandler} />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default withRouter(PopUp)
