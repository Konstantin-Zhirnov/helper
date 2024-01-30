import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './PolicyLink.module.sass'

const PolicyLink: React.FC = () => (
  <NavLink to="/policy" className={classes.link}>
    Privacy Policy
  </NavLink>
)

export { PolicyLink }
