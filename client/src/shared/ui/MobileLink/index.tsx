import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './MobileLink.module.sass'

interface IProps {
  to: string
  text: string
  cb: () => void
}
const MobileLink: React.FC<IProps> = React.memo(({ to, text, cb }) => {
  return (
    <NavLink to={to} onClick={cb} className={classes.link}>
      {text}
    </NavLink>
  )
})

export { MobileLink }
