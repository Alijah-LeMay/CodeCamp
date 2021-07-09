import React from 'react'
import classes from './HomeScreen.module.css'

// My Components
import CenterContainer from '../../components/CenterContainer'
import { MyEditor } from '../../components/AceEditor'
import Loader from '../../components/Loader'
// Assets

const HomeScreen = () => {
  return (
    <div className={classes.screen_container}>
      <CenterContainer bgColor='#f2f2f2' bgPadding='25px 0'>
        <div>Welcome To Our Code Academy</div>
        <MyEditor />
      </CenterContainer>
    </div>
  )
}

export default HomeScreen
