import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const ForgotPassword: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Changing the password. If you forgot your password</p>
      <p className={classes.text}>
        1. If you forgot your password, then you need to click the "Log In" button.
      </p>
      <Img src="/images/13.webp" alt="image sign up" />
      <div className={classes.images}>
        <Img src="/images/2.webp" alt="image sign up" />
        <Img src="/images/14.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>2. Next, you need to click on the link "Forgot password".</p>
      <div className={classes.images}>
        <Img src="/images/15.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>3. You need to enter your email address and send a request.</p>
      <Img src="/images/16.webp" alt="image sign up" />
      <p className={classes.text}>
        4. Check your email and confirm your email by clicking on the link.
      </p>
      <div className={classes.images}>
        <Img src="/images/17.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>
        5. Next, you need to enter the new password twice and send a request. After that, your
        password will be changed.
      </p>
      <Img src="/images/18.webp" alt="image sign up" />
    </>
  )
}

export { ForgotPassword }
