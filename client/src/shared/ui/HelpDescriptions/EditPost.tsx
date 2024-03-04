import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const EditPost: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Editing and deleting a post</p>
      <p className={classes.text}>
        After your successful authorization, you can edit and delete a post.
      </p>
      <p className={classes.text}>
        1. In order to edit or delete a post, you need to go to the "Settings" section
      </p>
      <Img src="/images/7.webp" alt="image sign up" />
      <Img src="/images/9.webp" alt="image sign up" />
      <div className={classes.images}>
        <Img src="/images/2.webp" alt="image sign up" />
        <Img src="/images/10.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>2. In the "Posts" section, you can edit or delete a post.</p>
      <Img src="/images/21.webp" alt="image sign up" />
    </>
  )
}

export { EditPost }
