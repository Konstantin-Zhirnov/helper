import React from 'react'

import { Avatar, useAppSelector } from '../../../../shared'

import { getAuth } from '../../model/slice'

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
}

const Authorization: React.FC<IProps> = React.memo(({ photo, name, isReload, isMobile }) => {
  const isAuth = useAppSelector(getAuth)

  const getDesktopVersion = () => {
    return !isAuth ? (
      <>
        <Login />
        <SignUp />
      </>
    ) : (
      <>
        <Avatar photo={photo} isReload={isReload} size="sm" />
        <User name={name} />
      </>
    )
  }

  const getMobileVersion = () => {
    return !isAuth ? (
      <div className={classes.container}>
        <Login isMobile={isMobile} />
        <SignUp isMobile={isMobile} />
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
})

export { Authorization }
