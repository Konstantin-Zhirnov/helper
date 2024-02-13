import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const AddPost: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Adding a post</p>
      <p className={classes.text}>After your successful authorization, you can add a post.</p>
      <p className={classes.text}>
        1. In order to add a post, you need to be on the page with posts and click on the round
        button with the plus symbol in the lower right corner.
      </p>
      <Img src="/images/19.webp" alt="image sign up" />
      <p className={classes.text}>
        2. Fill in all the necessary information, including location, category, title, description.
        If desired, you can add photos. And click on the send button. Your post will be published
        for the location that you specified when creating it.
      </p>
      <div className={classes.images}>
        <Img src="/images/20.webp" alt="image sign up" />
      </div>
    </>
  )
}

export { AddPost }
