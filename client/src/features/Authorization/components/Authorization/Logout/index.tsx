import React from 'react'

import { useAppDispatch } from '../../../../../app'
import { fetchLogout } from '../../../model/asyncActions'

import { LoginButton } from '../../../../../shared'

interface IProps {
  isAuth: boolean
}

const Logout: React.FC<IProps> = React.memo(({ isAuth }) => {
  const dispatch = useAppDispatch()

  const handleClick = React.useCallback(() => {
    dispatch(fetchLogout())
  }, [])

  return (
    <LoginButton onClick={handleClick} isAuth={isAuth} />
  )
})

export { Logout }
