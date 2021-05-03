import React from 'react'
import classes from './Backdrop.module.css'

// Usage: show prop must be true to display background.
//        clicked prop should run a func to set show prop
//        to false.
//        zIndex at 100:  If you want content above, make
//        zIndex > 100

const Backdrop = (props) =>
  props.show ? (
    <div className={classes.backdrop} onClick={props.clicked}>
      {props.children}
    </div>
  ) : null

export default Backdrop
