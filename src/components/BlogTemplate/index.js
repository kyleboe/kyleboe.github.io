import React from 'react'
import injectSheet from 'react-jss'
import style from './styles'

const BlogTemplate = ({ classes }) => (
  <div className={classes.container}>
    <h1>Hello World</h1>
  </div>
)

export default injectSheet(style)(BlogTemplate)
