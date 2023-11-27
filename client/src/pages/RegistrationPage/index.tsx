import React from 'react'
import { Heading } from '@chakra-ui/react'

import { useAppSelector } from '../../app'
import { getRegistered, getRegistrationErrorMessage, RegistrationForm } from '../../features'
import { Wrapper } from '../../shared'

import classes from './RegistrationPage.module.sass'


const RegistrationPage: React.FC = () => {
  const isRegistered = useAppSelector(getRegistered)
  const registrationErrorMessage = useAppSelector(getRegistrationErrorMessage)

  return (
    <Wrapper>
      <Heading as='h1' size='lg' className={classes.title}>
        Registration
      </Heading>

      {
        isRegistered
          ?
          <p className={classes.text}>Your user account has been successfully created. Please confirm
            your email.</p>
          : <RegistrationForm />
      }
      {
        registrationErrorMessage && <p className={classes.error}>{registrationErrorMessage}</p>
      }
    </Wrapper>
  )
}

export default RegistrationPage
