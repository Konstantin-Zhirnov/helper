import React from 'react'
import { useLocation } from 'react-router-dom'
import { Authorization, Location, Search } from '../../features'
import { Logo, useMatchMedia, Wrapper } from '../../shared'

import classes from './Header.module.sass'


const Header: React.FC = React.memo(() => {

  const { isMobile } = useMatchMedia()
  const { pathname } = useLocation()

  return (
    <header className={classes.header}>
      <Wrapper>
        <div className={classes.container}>

          <Logo isMobile={isMobile} pathname={pathname} />

          {!isMobile && pathname === '/' && <Search />}

          {pathname === '/' && <Location isMobile={isMobile} />}

          <Authorization />
        </div>
      </Wrapper>
    </header>
  )
})

export { Header }
