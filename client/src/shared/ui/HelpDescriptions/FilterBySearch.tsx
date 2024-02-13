import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const FilterBySearch: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Filter by search</p>
      <p className={classes.text}>
        1. To filter by search, you need to start typing the desired word and the posts will be
        filtered.
      </p>
      <Img src="/images/29.webp" alt="image sign up" />
      <p className={classes.text}>
        2. To filter by search in the mobile version, you need to enter the desired word, and click
        the "Search" button.
      </p>
      <div className={classes.images}>
        <Img src="/images/34.webp" alt="image sign up" />
      </div>
      <p className={classes.text}>
        3. In the desktop version of the application, you can add a location to the search, and
        click the "Search" button.
      </p>
      <Img src="/images/35.webp" alt="image sign up" />
    </>
  )
}

export { FilterBySearch }
