import React from 'react'
import { MdLogin, MdLogout } from 'react-icons/md'

import classes from './LoginButton.module.sass'

interface IProps {
  onClick: () => void
  isAuth: boolean
}

const LoginButton: React.FC<IProps> = React.memo(({ onClick, isAuth }) => {

  const getIcon = () => isAuth ? <MdLogout /> : <MdLogin />
  const getAriaLabel = () => isAuth ? 'Logout button' : 'Login button'

  const handleClick = () => {
    onClick()
  }

  return (
    <button aria-label={getAriaLabel()}  onClick={handleClick}
            className={classes.btn} >{getIcon()}</button>
  )
})

export { LoginButton }