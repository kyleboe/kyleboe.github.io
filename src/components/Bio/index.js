import React from 'react'
import injectSheet from 'react-jss'
import style from './styles'

const Bio = ({ classes }) => (
  <div className={classes.container}>
    <h1>This is the Bio</h1>
  </div>
)

export default injectSheet(style)(Bio)
