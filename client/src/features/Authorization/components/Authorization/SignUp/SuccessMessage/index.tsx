import React from 'react'

import classes from './SuccessMessage.module.sass'

const SuccessMessage: React.FC = React.memo(() => {


  return (
    <div className={classes.container}>
      <p className={classes.text}>
        Your user account has been successfully created. Please confirm your email.
      </p>
      <p className={classes.text}>
        If you haven`t received an email within 30 seconds, then check the Spam folder.
      </p>
    </div>
  )
})

export { SuccessMessage }