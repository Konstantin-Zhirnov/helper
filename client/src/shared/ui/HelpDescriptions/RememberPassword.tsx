import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const RememberPassword: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Changing the password. If you remember the password</p>
      <p className={classes.text}>
        1. If you remember your password and just want to change it, then you can easily do it in
        the "Settings" section.
      </p>
      <Img src="/images/9.webp" alt="image sign up" />
      <div className={classes.images}>
        <Img src="/images/2.webp" alt="image sign up" />
        <Img src="/images/10.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>
        2. You need to select the "Password" section and enter the new password twice.
      </p>
      <Img src="/images/12.webp" alt="image sign up" />
    </>
  )
}

export { RememberPassword }
