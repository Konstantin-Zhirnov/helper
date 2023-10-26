import React from 'react'
import { motion } from 'framer-motion'

import { Post } from '../../entities'
import { posts } from './postsList'

import classes from './Posts.module.sass'

const Posts: React.FC = () => {
  return (
    <motion.ul className={classes.cards}>
      {posts.map((card, index) => (
        <Post
          key={index}
          index={index}
          title={card.title}
          content={card.content}
          actions={card.actions}
        />
      ))}
    </motion.ul>
  )
}

export default Posts
