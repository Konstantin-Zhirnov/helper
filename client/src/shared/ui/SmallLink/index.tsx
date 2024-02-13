import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './SmallLink.module.sass'

interface IProps {
  to: string
  text: string
}
const SmallLink: React.FC<IProps> = React.memo(({ to, text }) => (
  <NavLink to={to} className={classes.link}>
    {text}
  </NavLink>
))

export { SmallLink }
