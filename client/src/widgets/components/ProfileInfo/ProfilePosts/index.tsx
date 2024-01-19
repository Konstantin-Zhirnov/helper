import React from 'react'

import {getPostsByUser, renderPostItem} from '../../../../features'
import {useAppSelector} from "../../../../shared";

import classes from './ProfilePosts.module.sass'


const ProfilePosts: React.FC = React.memo(() => {
  const postsByUser = useAppSelector(getPostsByUser)


  return (
        <ul className={classes.container}>
          { Boolean(postsByUser.length)
              ? postsByUser.map(renderPostItem)
              : <p>You haven't posted any posts yet</p>
          }
        </ul>
  )
})

export { ProfilePosts }
