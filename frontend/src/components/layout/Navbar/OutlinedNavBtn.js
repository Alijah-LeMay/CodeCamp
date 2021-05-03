import React from 'react'
import { NavLink } from 'react-router-dom'
import Radium from 'radium'
import classes from './Navbar.module.css'

// Assets

const OutlinedNavBtn = ({ to, content, children, mobile, clicked }) => {
  let currentlyActiveStyle = { color: '#4bb781' }
  const currentClass = mobile
    ? classes.mobile_outlined_nav_li
    : classes.outlined_nav_li
  return (
    <li className={currentClass}>
      <NavLink
        className={classes.wideLink}
        to={to}
        activeStyle={currentlyActiveStyle}
        onClick={clicked}
      >
        {content ? content : children}
      </NavLink>
    </li>
  )
}

export default Radium(OutlinedNavBtn)
