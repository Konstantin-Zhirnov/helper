import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MobileLink, useAppDispatch } from '../../../../../shared'

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
      <MobileLink to="/help" text="How to use it" cb={() => dispatch(setMobileMenu(false))} />
    </>
  )
})

export { UserMobile }
