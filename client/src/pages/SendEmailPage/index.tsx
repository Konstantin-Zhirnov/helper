import React from 'react'
import cn from 'classnames'
import { Heading } from '@chakra-ui/react'


import { clearSendEmail, getSendEmailMessage, getSendEmailReason, SendToEmail } from '../../features'
import { useAppDispatch, useAppSelector, Wrapper } from '../../shared'

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
        !sendEmailReason && (
          <>
            <p className={classes.text}>{getText()}</p>

            <SendToEmail sendEmailReason={sendEmailReason} />
          </>
        )
      }
      <p className={cn(classes.text, { [`${classes.red}`]: getClass() })}>{sendEmailMessage}</p>
    </Wrapper>
  )
}

export default SendEmailPage




