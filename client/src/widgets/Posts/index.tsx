import React from 'react'
import { Post, PostType, ReasonType } from '../../features'

import classes from './Posts.module.sass'


interface IProps {
  posts: PostType[]
  reason: ReasonType
}

const Posts: React.FC<IProps> = React.memo(({ posts, reason }) => {

  const renderItem = (post: PostType) => (
    <Post
      key={post._id}
      _id={post._id}
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
      countReviews={post.authorId.countReviews}
      images={post.images}
      reason={reason}
    />
  )

  return (
    <ul className={classes.cards}>
      {posts.map(renderItem)}
    </ul>
  )
})

export { Posts }
