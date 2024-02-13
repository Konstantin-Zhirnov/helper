import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const Contacts: React.FC = () => {
  return (
    <>
      <p className={classes.title}>View the user's available contacts</p>
      <p className={classes.text}>
        1. In order to view the user's available contacts, you need to click on the "Contact" button
        at the bottom of the post.
      </p>
      <div className={classes.images}>
        <Img src="/images/26.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>
        2. If the user's contacts are filled in correctly, then clicking on them will make a call or
        open a chat with this user.
      </p>
      <div className={classes.images}>
        <Img src="/images/27.webp" alt="image sign up" />
      </div>
    </>
  )
}

export { Contacts }
