import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router-dom'

const MyButton = ({
  padding,
  fontSize,
  bgColor,
  content,
  color,
  bgHoverColor,
  hoverColor,
  styleVariant,
  variant,
  to,
  children,
  direction,
  radius,
  decoration,
  margin,
  outMargin,
}) => {
  let rStyle = {
    containerDiv: {
      display: 'block',
      textAlign: direction && direction,
    },
    //  for buttons that do not contain an inner P
    submitBtn: {
      margin: outMargin ? outMargin : 'auto',
      border: 'none',
      justifyContent: 'start',
      textDecoration: decoration ? decoration : 'none',
      color: color ? color : '#333',
      padding: padding ? padding : '15px 30px',
      backgroundColor: bgColor ? bgColor : 'white',
      borderRadius: radius ? radius : '40px',
      fontSize: fontSize ? fontSize : '1.2rem',
      boxShadow:
        '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 -2px 5px 0 rgba(0, 0, 0, 0.19)',
      ':hover': {
        backgroundColor: bgHoverColor ? bgHoverColor : 'rgb(131, 126, 126)',
        color: hoverColor ? hoverColor : 'white',
      },
    },
    // if the button contains an inner P
    buttonPara: {
      margin: outMargin ? outMargin : 'auto',
      textDecoration: decoration ? decoration : 'none',
      color: color ? color : '#333',
      padding: padding ? padding : '15px 30px',
      backgroundColor: bgColor ? bgColor : 'white',
      borderRadius: radius ? radius : '40px',
      fontSize: fontSize ? fontSize : '1.2rem',
      boxShadow:
        '0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 -2px 5px 0 rgba(0, 0, 0, 0.19)',
      display: 'inline-block',
      ':hover': {
        backgroundColor: bgHoverColor ? bgHoverColor : 'rgb(131, 126, 126)',
        color: hoverColor ? hoverColor : 'white',
      },
    },
  }

  if (styleVariant)
    if (styleVariant === 'clear') {
      rStyle = {
        containerDiv: {
          display: 'block',
          margin: margin && margin,
        },
        submitBtn: {
          display: 'block',
          margin: margin && margin,
          padding: padding ? padding : '15px',
          textDecoration: decoration ? decoration : 'none',
          height: 'auto',
          fontSize: fontSize ? fontSize : '1.2rem',
          borderRadius: radius ? radius : '40px',
          backgroundColor: bgColor ? bgColor : 'rgba(0,0,0,0)',
          color: color ? color : '#333',
          borderWidth: '0px',
          ':hover': {
            color: hoverColor ? hoverColor : 'white',
          },
        },
        buttonPara: {
          textAlign: direction && direction,
          textDecoration: decoration ? decoration : 'none',
          padding: padding ? padding : '15px',
          height: 'auto',
          fontSize: fontSize ? fontSize : '1.2rem',
          borderRadius: radius ? radius : '40px',
          backgroundColor: bgColor && bgColor,
          color: color ? color : '#333',
          borderWidth: '0px',
          ':hover': {
            color: hoverColor ? hoverColor : 'white',
          },
        },
      }
    }
  // sanity check
  if (!to) {
    to = '/'
  }
  //  AS DEFAULT
  //  React Router Button
  //  INSIDE LINKS
  let template = (
    <div style={rStyle.containerDiv}>
      <Link to={to}>
        <p style={rStyle.buttonPara}>{content ? content : children}</p>
      </Link>
    </div>
  )
  //  variant
  //  <a> link button
  //  OUTSIDE LINKS
  if (variant === 'a') {
    template = (
      <div style={rStyle.containerDiv}>
        <a href={to}>
          <p style={rStyle.buttonPara}>{content ? content : children}</p>
        </a>
      </div>
    )
  }
  //  variant
  //  submit button variant
  //  FOR FORMS
  if (variant === 'submit') {
    template = (
      <div style={rStyle.containerDiv}>
        <button style={rStyle.submitBtn} type='submit'>
          {content ? content : children}
        </button>
      </div>
    )
  }
  // variant
  //  function button
  //  ONCLICK HANDLERS
  if (variant === 'func') {
    template = (
      <div style={rStyle.containerDiv}>
        <button style={rStyle.submitBtn} onClick={to}>
          {content ? content : children}
        </button>
      </div>
    )
  }
  return template
}

export default Radium(MyButton)
