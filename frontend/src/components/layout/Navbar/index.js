import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Assets
import classes from './Navbar.module.css'

// My Components
import HamburgerMenu from './HamburgerMenu'
import NavigationItems from './NavigationItems'
import CenterContainer from '../../CenterContainer'
import OutlinedNavBtn from './OutlinedNavBtn'

const Navbar = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const drawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }
  const drawerCloseHandler = () => {
    setShowSideDrawer(false)
  }

  return (
    <CenterContainer>
      <nav className={classes.nav}>
        <div className={classes.headerLogo}>
          <Link to='/'>
            <h1 style={{ color: 'white', padding: 0 }}>CodeCamp</h1>
          </Link>
        </div>

        <ul className={classes.desktop_container}>
          <NavigationItems />
          <OutlinedNavBtn to='/learn' content='Get Started' />
        </ul>
        <HamburgerMenu
          showBack={showSideDrawer}
          clicked={drawerToggleHandler}
          close={drawerCloseHandler}
        />
      </nav>
    </CenterContainer>
  )
}

export default Navbar
