import React from 'react'
import classes from './FormField.module.css'

const FormField = ({ label, type, config, value, changed }) => {
  let inputElement = null
  if (value === undefined) {
    value = ''
  }
  switch (type) {
    case 'input':
      inputElement = (
        <input
          className={classes.text}
          {...config}
          value={value}
          onChange={changed}
        />
      )
      break
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.text}
          {...config}
          value={value}
          onChange={changed}
        />
      )
      break
    case 'select':
      inputElement = (
        <select className={classes.text} value={value} onChange={changed}>
          {config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break

    default:
      inputElement = (
        <input
          className={classes.text}
          {...config}
          value={value}
          onChange={changed}
        />
      )
  }
  return (
    <div className={classes.input}>
      <label className={classes.label}>{label}</label>
      {inputElement}
    </div>
  )
}

export default FormField
