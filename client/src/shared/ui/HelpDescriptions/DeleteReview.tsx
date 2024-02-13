import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const DeleteReview: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Deleting a user review</p>
      <p className={classes.text}>
        To delete the user reviews you have published, go to the Settings section.
      </p>
      <Img src="/images/25.webp" alt="image sign up" />
      <div className={classes.images}>
        <Img src="/images/2.webp" alt="image sign up" />
        <Img src="/images/10.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>2. In the "Reviews" section, you can delete a review.</p>
      <Img src="/images/25.webp" alt="image sign up" />
    </>
  )
}

export { DeleteReview }
