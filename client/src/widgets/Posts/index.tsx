import React from 'react'

import { getPosts, renderPostItem } from '../../features'
import {useAppSelector} from "../../shared";

import classes from './Posts.module.sass'


const Posts: React.FC = React.memo(() => {

  const posts = useAppSelector(getPosts)

  return (
      <div className={classes.container}>
        <h2 className={classes.title}>Listings</h2>
        <ul className={classes.posts}>
          {posts.map(renderPostItem)}
        </ul>
      </div>
  )
})

export { Posts }
