import React from 'react'

import { ReviewSkeleton } from '../../shared'

import classes from './ReviewSkeletons.module.sass'


const ReviewSkeletons: React.FC = React.memo(() => {


  return (
    <ul className={classes.cards}>
      <ReviewSkeleton />
      <ReviewSkeleton />
      <ReviewSkeleton />
    </ul>
  )
})

export { ReviewSkeletons }