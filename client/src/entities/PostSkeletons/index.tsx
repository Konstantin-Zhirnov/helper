import React from 'react'

import { PostSkeleton } from '../../shared'

import classes from './PostSkeletons.module.sass'


const PostSkeletons: React.FC = React.memo(() => {
  return (
    <ul className={classes.cards}>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </ul>
  )
})

export { PostSkeletons }
