import React from 'react'

// My Components
import CenterContainer from '../../components/CenterContainer'
import Meta from '../../components/Meta'
import MyButton from '../../components/MyButton'

// Assets
import classes from './NotFoundScreen.module.css'

const NotFoundScreen = () => {
  return (
    <div className={classes.screen_container}>
      <Meta
        title='The Web Developers'
        description='One Stop Shop for Website, Software, and Mobile Development.'
      />

      <CenterContainer bgPadding='60px 0'>
        <i
          className='fas fa-surprise'
          style={{ fontSize: '10rem', padding: '0 0 50px 0' }}
        ></i>
        <h1 style={{ padding: '0 0 20px 0' }}>
          Oh no! This page doesn't exist.
        </h1>
        <MyButton content='Go Home' to='/' />
      </CenterContainer>
    </div>
  )
}

export default NotFoundScreen
