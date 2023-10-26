import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../app'
import { Authorization, fetchUser } from '../../features'
import { Wrapper } from '../../shared'

import classes from './Header.module.sass'

const Header: React.FC = () => {

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <header className={classes.header}>
      <Wrapper>
        <div className={classes.container}>
          <NavLink to="/" className={classes.link}>
            <img src="/images/logo.png" alt="logo" className={classes.logo} />

            <p className={classes.title}>Helper</p>
          </NavLink>

          <Authorization />
        </div>
      </Wrapper>
    </header>
  )
}
export default Header
