import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const UserInfo: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Adding and editing information about yourself</p>
      <p className={classes.text}>
        1. In order to edit or add information about yourself, you need to go to the "Settings"
        section
      </p>
      <Img src="/images/9.webp" alt="Adding and editing information" />
      <div className={classes.images}>
        <Img src="/images/2.webp" alt="Adding and editing information" />
        <Img src="/images/10.webp" alt="Adding and editing information" />
      </div>
      <p className={classes.text}>
        2. In the "Profile" section, you can edit or add information about yourself. You can also
        completely delete your user (all the information you provide will be completely deleted from
        the database).
      </p>
      <Img src="/images/11.webp" alt="Adding and editing information" />
    </>
  )
}

export { UserInfo }
