import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'

const NavigationItems = (props) => {
  const { clicked } = props
  let currentlyActiveStyle = { color: '#4bb781' }

  let navItems = [
    { to: '/', name: 'Home' },
    { to: '/courses', name: 'Courses' },
    { to: '/register', name: 'Log In' },
  ]

  return (
    <>
      {navItems.map((item, idx) => (
        <li key={idx} className={classes.regular_nav_li}>
          <NavLink
            className={classes.wideLink}
            exact
            activeStyle={currentlyActiveStyle}
            to={item.to}
            onClick={clicked}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </>
  )
}

export default NavigationItems
