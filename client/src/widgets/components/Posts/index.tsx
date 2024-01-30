import React from 'react'

import { getPosts, getPostsLoading, renderPostItem } from '../../../features'
import { Spinner, useAppSelector } from '../../../shared'

import classes from './Posts.module.sass'

const Posts: React.FC = React.memo(() => {
  const posts = useAppSelector(getPosts)
  const isLoading = useAppSelector(getPostsLoading)

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Listings</h2>
      <ul className={classes.posts}>
        {posts.map(renderPostItem)}
        {isLoading && <Spinner />}
      </ul>
    </div>
  )
})

export { Posts }
