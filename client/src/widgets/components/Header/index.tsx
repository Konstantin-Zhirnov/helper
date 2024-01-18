import React from 'react'
import cn from "classnames";
import { useLocation } from 'react-router-dom'

import {
  Authorization,
  getIsReload,
  getMobileMenu,
  getUserName,
  getUserPhoto,
  Location,
  MobileMenuButton,
  Search
} from '../../../features'
import { Logo, useAppSelector, useMatchMedia, Wrapper } from '../../../shared'

import classes from './Header.module.sass'


const Header: React.FC = React.memo(() => {

  const { isMobile } = useMatchMedia()
  const { pathname } = useLocation()

  const photo = useAppSelector(getUserPhoto)
  const name = useAppSelector(getUserName)
  const isReload = useAppSelector(getIsReload)
  const isMobileMenu = useAppSelector(getMobileMenu)

  return (
    <header className={cn(classes.header, {[classes.mobile]: isMobileMenu})}>
      <Wrapper>
        <div className={classes.container}>

          <Logo isMobile={isMobile} pathname={pathname} />

          {
            !isMobile
              ? <>
                  {pathname === '/' && <><Location /><Search /></>}

                  <Authorization photo={photo} name={name} isReload={isReload}/>
                </>
              : <MobileMenuButton/>
          }

        </div>
        {isMobileMenu && <Authorization photo={photo} name={name} isReload={isReload} isMobile={isMobile} />}
      </Wrapper>
    </header>
  )
})

export { Header }
