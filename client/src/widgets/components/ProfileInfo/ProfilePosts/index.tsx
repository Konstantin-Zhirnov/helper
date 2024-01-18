import React from 'react'

import {getPostsByUser, renderPostItem} from '../../../../features'
import {useAppSelector} from "../../../../shared";

import classes from './ProfilePosts.module.sass'


const ProfilePosts: React.FC = React.memo(() => {
  const postsByUser = useAppSelector(getPostsByUser)


  return (
        <ul className={classes.container}>
          {postsByUser.map(renderPostItem)}
        </ul>
  )
})

export { ProfilePosts }
