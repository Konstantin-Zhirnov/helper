import React from 'react'
import { useLocation } from 'react-router-dom'

import { Authorization, getIsReload, getUserName, getUserPhoto, Location, Search } from '../../features'
import { Logo, useAppSelector, useMatchMedia, Wrapper } from '../../shared'

import classes from './Header.module.sass'


const Header: React.FC = React.memo(() => {

  const { isMobile } = useMatchMedia()
  const { pathname } = useLocation()
  const photo = useAppSelector(getUserPhoto)
  const name = useAppSelector(getUserName)
  const isReload = useAppSelector(getIsReload)

  return (
    <header className={classes.header}>
      <Wrapper>
        <div className={classes.container}>

          <Logo isMobile={isMobile} pathname={pathname} />

          {!isMobile && pathname === '/' && <Search />}

          {pathname === '/' && <Location isMobile={isMobile} />}

          <Authorization photo={photo} name={name} isReload={isReload} />
        </div>
      </Wrapper>
    </header>
  )
})

export { Header }
