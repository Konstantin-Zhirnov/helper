import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchConfirmation, fetchUser, getIsActivated } from '../../features'
import {Title, useAppDispatch, useAppSelector, Wrapper} from '../../shared'

import classes from './ConfirmationPage.module.sass'


const ConfirmationPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const isActivated = useAppSelector(getIsActivated)

  const { link } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(fetchConfirmation({ link }))
  }, [])

  React.useEffect(() => {
    if (isActivated) {
      const timer = setTimeout(() => {
        dispatch(fetchUser())
        navigate('/')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isActivated])

  return (
      <>
        <Title text="Email Confirmation" divider/>
        <Wrapper>
        {
            !isActivated && <p className={classes.text}>Your account has been successfully activated!</p>
        }
        </Wrapper>
      </>
  )
}

export default ConfirmationPage
