import React from 'react'
import cn from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import { Authorization, Location, Search } from '../../features'
import { useMatchMedia, Wrapper } from '../../shared'

import classes from './Header.module.sass'


const Header: React.FC = () => {

  const { isMobile } = useMatchMedia()
  const { pathname } = useLocation()

  return (
    <header className={classes.header}>
      <Wrapper>
        <div className={classes.container}>
          <NavLink to='/' className={cn(classes.link, {
            [`${classes.mobile}`]: isMobile || pathname !== '/',
          })}>
            <img src='/images/ca.svg' alt='logo' className={classes.logo} />

            <p className={classes.title}>Helper</p>
          </NavLink>

          {!isMobile && pathname === '/' && <Search />}

          {pathname === '/' && <Location isMobile={isMobile} />}

          <Authorization />
        </div>
      </Wrapper>
    </header>
  )
}
export default Header
