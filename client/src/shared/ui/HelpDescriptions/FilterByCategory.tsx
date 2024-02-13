import React from 'react'

import { Img } from '../Img'

import classes from './Help.module.sass'

const FilterByCategory: React.FC = () => {
  return (
    <>
      <p className={classes.title}>Filter by category</p>
      <p className={classes.text}>
        To filter by category, you need to select and click one of the presented category buttons.
        It`s color will change and the posts will be filtered out.
      </p>
      <Img src="/images/28.webp" alt="image sign up" />
    </>
  )
}

export { FilterByCategory }
