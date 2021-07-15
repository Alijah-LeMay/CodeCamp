import React from 'react'
import Radium from 'radium'
import { Container, Col, Row } from 'react-bootstrap'

const Table = ({ variant, children, fixed }) => {
  let rStyle = {
    table: {
      backgroundColor: '#ccc',
      tableLayout: fixed && 'fixed',
    },
  }
  return <table style={rStyle.table}>{children}</table>
}

export default Radium(Table)
