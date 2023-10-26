import React from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@chakra-ui/react'

import classes from './AvatarButton.module.sass'


type PropsType = {
  link: string
  src: string
  name: string
  size?: string
}

const AvatarButton: React.FC<PropsType> = ({ link, src, name, size }) => {
  return (
    <NavLink to={link} >
      <Avatar name={name} src={src} size={size || 'md'} className={classes.avatar}/>
    </NavLink>
  )
}

export { AvatarButton }
