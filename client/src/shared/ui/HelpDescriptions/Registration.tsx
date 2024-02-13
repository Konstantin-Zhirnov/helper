import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const Registration: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Registration</p>
      <p className={classes.text}>
        To be able to post or leave feedback about other users, you need to go through the
        registration process.
      </p>
      <p className={classes.text}>1. To do this, you need to click on the "Sign Up" button.</p>
      <Img src="/images/1.webp" alt="Registration" />
      <div className={classes.images}>
        <Img src="/images/2.webp" alt="Registration" />
        <Img src="/images/3.webp" alt="Registration" />
      </div>
      <p className={classes.text}>2. Fill out and submit the registration form.</p>
      <div className={classes.images}>
        <Img src="/images/4.webp" alt="Registration" />
      </div>
      <p className={classes.text}>3. Read this message.</p>
      <div className={classes.images}>
        <Img src="/images/5.webp" alt="Registration" />
      </div>
      <p className={classes.text}>
        4. Check your email and confirm your email by clicking on the link.
      </p>
      <div className={classes.images}>
        <Img src="/images/6.webp" alt="Registration" />
      </div>
      <p className={classes.text}>
        5. After successful registration, you will see your name in the upper right corner or in the
        menu for mobile devices.
      </p>
      <Img src="/images/7.webp" alt="Registration" />
      <div className={classes.images}>
        <Img src="/images/2.webp" alt="Registration" />
        <Img src="/images/8.webp" alt="Registration" />
      </div>
    </>
  )
}

export { Registration }
