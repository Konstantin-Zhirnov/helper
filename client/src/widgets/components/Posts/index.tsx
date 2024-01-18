import React from 'react'
import {useLocation} from "react-router-dom"
import cn from "classnames"

import { getPosts, renderPostItem } from '../../../features'
import {useAppSelector} from "../../../shared"

import classes from './Posts.module.sass'


const Posts: React.FC = React.memo(() => {

  const { pathname } = useLocation()

  const posts = useAppSelector(getPosts)

    const styles = cn(
        classes.posts,
        {[classes.small]:
            (pathname === '/profile' && posts.length === 1) ||
            (pathname === '/' && posts.length < 3)
        }
    )

  return (
      <div className={classes.container}>
        <h2 className={classes.title}>Listings</h2>
        <ul className={styles}>
          {posts.map(renderPostItem)}
        </ul>
      </div>
  )
})

export { Posts }
