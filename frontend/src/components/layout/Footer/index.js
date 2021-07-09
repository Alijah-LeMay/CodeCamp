import React from 'react'
import { Link } from 'react-router-dom'
import CenterContainer from '../../CenterContainer'
import classes from './Footer.module.css'

let navItems = [
  { to: '/', name: 'Home' },
  { to: '/course', name: 'Courses' },
  { to: '/register', name: 'Log In' },
]

const Footer = () => {
  return (
    <>
      <div className={classes.backStrip}></div>
      <div className={classes.background}>
        <CenterContainer>
          <div className={classes.innerDiv}>
            <ul>
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link className={classes.a} to={item.to}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className={classes.contact}>
              {'(239)-671-7373'} sales@thewebdev.net
            </h2>
            <h3 className={classes.copyRight}>&copy; LemaTech LLC 2020 </h3>
          </div>
        </CenterContainer>
      </div>
    </>
  )
}

export default Footer
