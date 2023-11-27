import React from 'react'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import classes from './Logo.module.sass'


interface IProps {
  isMobile: boolean,
  pathname: string
}

const Logo: React.FC<IProps> = React.memo(({ isMobile, pathname }) => {

  return (
    <NavLink
      to='/'
      className={cn(classes.link, { [`${classes.mobile}`]: isMobile || pathname !== '/' })}
    >
      <img src='/images/ca.svg' alt='logo' className={classes.logo} />

      <p className={classes.title}>Helper</p>
    </NavLink>
  )
})

export { Logo }
