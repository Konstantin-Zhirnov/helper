import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const AddReview: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Viewing and adding a user review</p>
      <p className={classes.text}>
        1. To view a user review, you need to click on the star icon at the top of the post.
      </p>
      <div className={classes.images}>
        <Img src="/images/22.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>
        2. A page opens on which all user reviews are published. If you are logged in, you can add
        your reviews by clicking on the plus sign button in the lower right corner.
      </p>
      <Img src="/images/23.webp" alt="image sign up" />
      <p className={classes.text}>
        3. To add a user review, fill in the required fields and click submit.
      </p>
      <div className={classes.images}>
        <Img src="/images/24.webp" alt="image sign up" />
      </div>
    </>
  )
}

export { AddReview }
