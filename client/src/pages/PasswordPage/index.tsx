import React from 'react'
import cn from 'classnames'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchUser, getChangePasswordMessage, PasswordChanging } from '../../features'
import { Title, useAppDispatch, useAppSelector, Wrapper } from '../../shared'

import classes from './PasswordPage.module.sass'

const PasswordPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const changePasswordMessage = useAppSelector(getChangePasswordMessage)

  const { link } = useParams()
  const navigate = useNavigate()

  const getClass = () => {
    return changePasswordMessage === 'The link to change the password is not valid'
  }

  React.useEffect(() => {
    if (changePasswordMessage === 'Your password has been successfully changed') {
      const timer = setTimeout(() => {
        dispatch(fetchUser())
        navigate('/')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [changePasswordMessage])

  return (
    <>
      <Title text="Password Change" divider />
      <Wrapper>
        <div className={classes.password}>
          <PasswordChanging link={link} />
        </div>
        {changePasswordMessage && (
          <p className={cn(classes.text, { [classes.red]: getClass() })}>{changePasswordMessage}</p>
        )}
      </Wrapper>
    </>
  )
}

export default PasswordPage
