import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const Locations: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Choosing locations</p>
      <p className={classes.text}>
        1. To change the location for the displayed posts, you need to click on the button with the
        selected location.
      </p>
      <Img src="/images/30.webp" alt="image sign up" />
      <div className={classes.images}>
        <Img src="/images/31.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>
        2. Next, you need to select the desired location from the list provided.
      </p>
      <Img src="/images/32.webp" alt="image sign up" />
      <p className={classes.text}>
        3. You can also filter the presented locations using the search filter.
      </p>
      <Img src="/images/33.webp" alt="image sign up" />
    </>
  )
}

export { Locations }
