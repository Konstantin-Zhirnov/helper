import React from 'react'

import { useAppSelector } from '../../../../shared'

import { getAuth } from '../../model/slice'
import { AvatarButton } from './AvatarButton'
import { Logout } from './Logout'
import { Login } from './Login'


import classes from './Authorization.module.sass'

interface IProps {
  photo: string
  name: string
  isReload: boolean
}

const Authorization: React.FC<IProps> = React.memo(({ photo, name, isReload }) => {

  const isAuth = useAppSelector(getAuth)

  const [_, setReload] = React.useState(false)

  React.useEffect(() => {
    setReload(isReload)
  }, [isReload])

  return !isAuth
    ? <Login isAuth={isAuth} />
    : (
      <div className={classes.container}>
        <AvatarButton link='profile' src={`${photo}?${new Date().getTime()}`} name={name} />
        <Logout isAuth={isAuth} />
      </div>
    )
})

export { Authorization }
