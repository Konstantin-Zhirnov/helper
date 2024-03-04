import React from 'react'

import { Avatar, MobileLink, useAppDispatch } from '../../../../shared'

import { setMobileMenu } from '../../model/slice'

import { Login } from './Login'
import { SignUp } from './SignUp'
import { User } from './User'
import { UserMobile } from './UserMobile'

import classes from './Authorization.module.sass'

interface IProps {
  photo: string
  name: string
  isReload: boolean
  isMobile?: boolean
  isAuth: boolean
}

const Authorization: React.FC<IProps> = React.memo(
  ({ photo, name, isReload, isMobile, isAuth }) => {
    const dispatch = useAppDispatch()

    const getDesktopVersion = () => {
      return !isAuth ? (
        <>
          <Login />
          <SignUp />
        </>
      ) : (
        <User photo={photo} isReload={isReload} />
      )
    }

    const getMobileVersion = () => {
      return !isAuth ? (
        <div className={classes.container}>
          <Login isMobile={isMobile} />
          <SignUp isMobile={isMobile} />
          <MobileLink to="/help" text="How to use it" cb={() => dispatch(setMobileMenu(false))} />
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.avatar}>
            <Avatar photo={photo} isReload={isReload} size="sm" />
            <p>{name}</p>
          </div>

          <UserMobile />
        </div>
      )
    }

    return isMobile ? getMobileVersion() : getDesktopVersion()
  },
)

export { Authorization }
