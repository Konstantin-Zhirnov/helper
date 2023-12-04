import React from 'react'
import { useLocation } from 'react-router-dom'

import { Authorization, getIsNewAvatar, getName, getPhoto, Location, Search } from '../../features'
import { Logo, useAppSelector, useMatchMedia, Wrapper } from '../../shared'

import classes from './Header.module.sass'


const Header: React.FC = React.memo(() => {

  const { isMobile } = useMatchMedia()
  const { pathname } = useLocation()
  const photo = useAppSelector(getPhoto)
  const name = useAppSelector(getName)
  const isNewAvatar = useAppSelector(getIsNewAvatar)

  return (
    <header className={classes.header}>
      <Wrapper>
        <div className={classes.container}>

          <Logo isMobile={isMobile} pathname={pathname} />

          {!isMobile && pathname === '/' && <Search />}

          {pathname === '/' && <Location isMobile={isMobile} />}

          <Authorization photo={photo} name={name} isNewAvatar={isNewAvatar} />
        </div>
      </Wrapper>
    </header>
  )
})

export { Header }
