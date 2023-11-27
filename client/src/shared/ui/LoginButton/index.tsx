import React from 'react'
import { IconButton } from '@chakra-ui/react'
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
    <IconButton colorScheme='blue' aria-label={getAriaLabel()} icon={getIcon()} onClick={handleClick}
                className={classes.btn} />
  )
})

export { LoginButton }