import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../app'
import { Authorization, fetchUser, Location } from '../../features'
import { Wrapper } from '../../shared'

import classes from './Header.module.sass'
import { setLocation } from '../../features/Posts/model/slice'

const Header: React.FC = () => {

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const location = localStorage.getItem('location')
    if (location) {
      dispatch(setLocation(location))
    } else {
      localStorage.setItem('location', 'Nanaimo')
      dispatch(setLocation('Nanaimo'))
    }
    dispatch(fetchUser())

  }, [])

  return (
    <header className={classes.header}>
      <Wrapper>
        <div className={classes.container}>
          <NavLink to='/' className={classes.link}>
            <img src='/images/logo.png' alt='logo' className={classes.logo} />

            <p className={classes.title}>Helper</p>
          </NavLink>

          <Location />

          <Authorization />
        </div>
      </Wrapper>
    </header>
  )
}
export default Header
