import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './AvatarButton.module.sass'


type PropsType = {
  link: string
  src: string
  name: string
  size?: string
}

const AvatarButton: React.FC<PropsType> = React.memo(({ link, src, name, size }) => {
  return (
    <NavLink to={link}>
      <img src={src} className={classes.avatar}  alt='user'/>
    </NavLink>
  )
})

export { AvatarButton }
