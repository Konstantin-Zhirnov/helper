import React from 'react'

import { LoginButton, useAppDispatch } from '../../../../../shared'
import { fetchLogout } from '../../../model/asyncActions'

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
