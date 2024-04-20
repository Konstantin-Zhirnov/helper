import React from 'react'
import cn from 'classnames'

import {
  clearSendEmail,
  fetchUser,
  getSendEmailMessage,
  getSendEmailReason,
  SendToEmail,
} from '../../features'
import { Title, useAppDispatch, useAppSelector, Wrapper } from '../../shared'

import classes from './SendEmailPage.module.sass'
import { useNavigate } from 'react-router-dom'

const SendEmailPage: React.FC = () => {
  const navigate = useNavigate()

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
    let timer: NodeJS.Timeout
    if (!sendEmailMessage && !sendEmailReason) {
      timer = setTimeout(() => {
        dispatch(fetchUser())
        navigate('/')
      }, 0)
    }
    return () => {
      dispatch(clearSendEmail())
      clearTimeout(timer)
    }
  }, [sendEmailMessage, sendEmailReason])

  return (
    <>
      <Title text="Request a link" divider />
      <Wrapper>
        {sendEmailReason && (
          <>
            <p
              className={classes.text}
            >{`${getText()} If you haven\`t received an email within 30 seconds, then check the Spam folder.`}</p>

            <SendToEmail sendEmailReason={sendEmailReason} />
          </>
        )}

        <p className={cn(classes.text, { [classes.red]: getClass() })}>{sendEmailMessage}</p>
      </Wrapper>
    </>
  )
}

export default SendEmailPage
