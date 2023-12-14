import React from 'react'
import {getPosts, getPostsByUser, Post, PostType, ReasonType} from '../../features'

import classes from './Posts.module.sass'
import {useAppSelector} from "../../shared";
import {PostSkeletons} from "../../entities";


interface IProps {
  reason: ReasonType
}

const Posts: React.FC<IProps> = React.memo(({ reason }) => {

  const posts = useAppSelector(getPosts)
  const postsByUser = useAppSelector(getPostsByUser)


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

  if (reason === 'all' && !posts.length) {
    return <PostSkeletons />
  }

  return (
    <ul className={classes.cards}>
      {(reason === 'all' ? posts : postsByUser).map(renderItem)}
    </ul>
  )
})

export { Posts }
