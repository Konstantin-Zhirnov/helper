import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heading } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../app'
import { fetchConfirmation, fetchUser, getIsActivated } from '../../features'
import { Wrapper } from '../../shared'

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
    <Wrapper>
      <Heading as='h1' size='lg' className={classes.title}>
        Email Confirmation
      </Heading>
      {
        isActivated && <p className={classes.text}>Your account has been successfully activated!</p>
      }
    </Wrapper>
  )
}

export default ConfirmationPage
