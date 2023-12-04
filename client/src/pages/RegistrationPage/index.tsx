import React from 'react'
import { Heading } from '@chakra-ui/react'


import { getRegistered, getRegistrationErrorMessage, RegistrationForm } from '../../features'
import { useAppSelector, Wrapper } from '../../shared'

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
          <>
            <p className={classes.text}>Your user account has been successfully created. Please confirm your email.</p>
            <p className={classes.text}>If you haven`t received an email within 30 seconds, then check the Spam
              folder.</p>
          </>

          : <RegistrationForm />
      }
      {
        registrationErrorMessage && <p className={classes.error}>{registrationErrorMessage}</p>
      }
    </Wrapper>
  )
}

export default RegistrationPage
