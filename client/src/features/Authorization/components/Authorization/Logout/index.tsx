import React from 'react'

import { useAppDispatch } from '../../../../../app'
import { fetchLogout } from '../../../model/asyncActions'

import { LoginButton } from '../../../../../shared'

interface IProps {
  isAuth: boolean
}

const Logout: React.FC<IProps> = ({isAuth}) => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(fetchLogout())
  }

  return (
    <LoginButton onClick={handleClick} isAuth={isAuth}/>
  )
}

export default Logout
