import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../app'

import { getAuth, getIsNewAvatar, getName, getPhoto, setIsNewAvatar } from '../../model/slice'
import { AvatarButton } from './AvatarButton'
import Logout from './Logout'
import Login from './Login'

import classes from './Authorization.module.sass'


const Authorization: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getAuth)
  const photo = useAppSelector(getPhoto)
  const name = useAppSelector(getName)
  const isNewAvatar = useAppSelector(getIsNewAvatar)

  React.useEffect(() => {
    if (isNewAvatar) {
      dispatch(setIsNewAvatar(false))
    }
  }, [isNewAvatar])

  return !isAuth
    ? <Login isAuth={isAuth} />
    : (
      <div className={classes.container}>
        <AvatarButton link='profile' src={`${photo}?${new Date().getTime()}`} name={name} />
        <Logout isAuth={isAuth} />
      </div>
    )
}

export { Authorization }
