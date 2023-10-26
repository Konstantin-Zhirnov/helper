import React from 'react'
import { Heading, Text } from '@chakra-ui/react'

import { useAppSelector } from '../../app'
import { RegistrationForm, getRegistered, getRegistrationErrorMessage } from '../../features'
import { Wrapper } from '../../shared'

import classes from './RegistrationPage.module.sass'


const RegistrationPage: React.FC = () => {
  const isRegistered = useAppSelector(getRegistered)
  const registrationErrorMessage = useAppSelector(getRegistrationErrorMessage)

  return (
    <Wrapper>
      <Heading as="h1" className={classes.title}>
        Registration
      </Heading>
    
      {
        isRegistered
          ? <Text fontSize='2xl' className={classes.text}>Your user account has been successfully created. Please confirm your email.</Text>
          : <RegistrationForm />
      }
      {
        registrationErrorMessage &&   <Text className={classes.error}>{ registrationErrorMessage }</Text>
      }
    </Wrapper>
  )
}

export default RegistrationPage
