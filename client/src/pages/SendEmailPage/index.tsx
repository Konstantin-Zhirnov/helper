import React from 'react'
import cn from 'classnames'
import { Heading, Text } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../app'
import { clearSendEmail, getSendEmailMessage, getSendEmailReason, SendToEmail } from '../../features'
import { Wrapper } from '../../shared'

import classes from './SendEmailPage.module.sass'


const SendEmailPage: React.FC = () => {

  const dispatch = useAppDispatch()
  const sendEmailMessage = useAppSelector(getSendEmailMessage)
  const sendEmailReason = useAppSelector(getSendEmailReason)

  const getText = () => {
    if (sendEmailReason === 'password') {
      return 'On this page you can request a link to change your password.'
    }
    if (sendEmailReason === 'activation') {
      return 'On this page you can request a re-link to activate your user account.'
    }
    return ''
  }

  const getClass = () => {
    return sendEmailMessage === 'There is no user with such an email'
  }

  React.useEffect(() => {
    return () => {
      dispatch(clearSendEmail())
    }
  }, [])

  return (
    <Wrapper>
      <Heading as='h1' size='lg' className={classes.title}>
        Request a link
      </Heading>
      {
        sendEmailReason && (
          <>
            <Text fontSize='lg' className={classes.text}>{getText()}</Text>

            <SendToEmail sendEmailReason={sendEmailReason} />
          </>
        )
      }
      <Text fontSize='2xl' className={cn(classes.text, { [`${classes.red}`]: getClass() })}>{sendEmailMessage}</Text>
    </Wrapper>
  )
}

export default SendEmailPage




