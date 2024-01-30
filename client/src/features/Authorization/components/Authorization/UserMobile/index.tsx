import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../../../shared'

import { fetchLogout } from '../../../model/asyncActions'
import { setMobileMenu } from '../../../model/slice'

import classes from './UserMobile.module.sass'

const UserMobile: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleSettingsClick = () => {
    navigate('/profile')
    dispatch(setMobileMenu(false))
  }

  const handleLogoutClick = () => {
    dispatch(fetchLogout())
  }

  return (
    <>
      <button onClick={handleSettingsClick} className={classes.btn}>
        Settings
      </button>
      <button onClick={handleLogoutClick} className={classes.btn}>
        Log Out
      </button>
    </>
  )
})

export { UserMobile }
