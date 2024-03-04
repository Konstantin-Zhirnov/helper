import React from 'react'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'

import {
  Authorization,
  getAuth,
  getIsReload,
  getMobileMenu,
  getUserName,
  getUserPhoto,
  Location,
  MobileMenuButton,
  Search,
  setMobileMenu,
} from '../../../features'
import { Logo, useAppDispatch, useAppSelector, useMatchMedia, Wrapper } from '../../../shared'

import { AddButtons } from './AddButtons'

import classes from './Header.module.sass'

const Header: React.FC = React.memo(() => {
  const { isMobile } = useMatchMedia()
  const { pathname } = useLocation()

  const dispatch = useAppDispatch()
  const photo = useAppSelector(getUserPhoto)
  const name = useAppSelector(getUserName)
  const isReload = useAppSelector(getIsReload)
  const isMobileMenu = useAppSelector(getMobileMenu)
  const isAuth = useAppSelector(getAuth)

  React.useEffect(() => {
    if (!isMobile && isMobileMenu) {
      dispatch(setMobileMenu(false))
    }
  }, [isMobile, isMobileMenu])

  return (
    <header className={cn(classes.header, { [classes.mobile]: isMobileMenu })}>
      <Wrapper>
        <div className={classes.container}>
          <Logo isMobile={isMobile} pathname={pathname} isAuth={isAuth} />

          {!isMobile ? (
            <>
              {pathname === '/' && (
                <>
                  <Location />

                  <Search />
                </>
              )}
              <AddButtons styles={classes.buttons} />
              <Authorization photo={photo} name={name} isReload={isReload} isAuth={isAuth} />
            </>
          ) : (
            <>
              <AddButtons styles={classes.buttons_mobile} />
              <MobileMenuButton />
            </>
          )}
        </div>

        {isMobileMenu && (
          <Authorization
            photo={photo}
            name={name}
            isReload={isReload}
            isMobile={isMobile}
            isAuth={isAuth}
          />
        )}
      </Wrapper>
    </header>
  )
})

export { Header }
