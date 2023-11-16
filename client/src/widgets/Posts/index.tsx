import React from 'react'
import { motion } from 'framer-motion'
import { Post, PostType, ReasonType } from '../../features'

import classes from './Posts.module.sass'


interface IProps {
  posts: PostType[]
  reason: ReasonType
}

const Posts: React.FC<IProps> = ({ posts, reason }) => {
  return (
    <motion.ul className={classes.cards}>
      {posts.map((post, index) => (
          <Post
            key={post._id}
            _id={post._id}
            index={index}
            title={post.title}
            description={post.description}
            location={post.location}
            time={post.time}
            postAuthorId={post.authorId._id}
            name={post.authorId.name}
            photo={post.authorId.photo}
            email={post.authorId.email}
            phone={post.authorId.phone}
            whatsapp={post.authorId.whatsapp}
            telegram={post.authorId.telegram}
            stars={post.authorId.stars}
            images={post.images}
            reason={reason}
          />
        ),
      )}
    </motion.ul>
  )
}

export default Posts
