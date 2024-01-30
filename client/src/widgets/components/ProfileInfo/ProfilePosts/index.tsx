import React from 'react'

import { getPostsByUser, renderPostItem } from '../../../../features'
import { useAppSelector } from '../../../../shared'

import classes from './ProfilePosts.module.sass'

const ProfilePosts: React.FC = React.memo(() => {
  const postsByUser = useAppSelector(getPostsByUser)

  if (!Boolean(postsByUser.length)) {
    return <p className={classes.text}>You haven't posted any posts yet</p>
  }

  return <ul className={classes.container}>{postsByUser.map(renderPostItem)}</ul>
})

export { ProfilePosts }
