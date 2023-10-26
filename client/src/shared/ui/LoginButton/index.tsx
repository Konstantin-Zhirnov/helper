import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { MdLogout, MdLogin } from "react-icons/md";

import classes from './LoginButton.module.sass'

interface IProps {
  onClick: () => void
  isAuth: boolean
}

const LoginButton: React.FC<IProps> = ({ onClick, isAuth }: IProps) => {

  const getIcon = () => isAuth ? <MdLogout/>: <MdLogin/>
  const getAriaLabel = () => isAuth ? "Logout button" : "Login button"

  const handleClick = () => {
    onClick()
  }

  return (
    <IconButton colorScheme='blue' aria-label={getAriaLabel()} icon={getIcon()} onClick={handleClick} className={classes.btn}/>
  )
}

export default LoginButton