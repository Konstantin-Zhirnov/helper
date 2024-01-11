import React from 'react'
import classes from './Posts.module.sass'

import { getPosts, renderPostItem } from '../../features'
import {useAppSelector} from "../../shared";




const Posts: React.FC = React.memo(() => {

  const posts = useAppSelector(getPosts)

  // const renderItem = (post: PostType) => (
  //   <Post
  //     key={post._id}
  //     _id={post._id}
  //     title={post.title}
  //     description={post.description}
  //     location={post.location}
  //     time={post.time}
  //     postAuthorId={post.authorId._id}
  //     name={post.authorId.name}
  //     photo={post.authorId.photo}
  //     email={post.authorId.email}
  //     phone={post.authorId.phone}
  //     whatsapp={post.authorId.whatsapp}
  //     telegram={post.authorId.telegram}
  //     stars={post.authorId.stars}
  //     countReviews={post.authorId.countReviews}
  //     images={post.images}
  //   />
  // )

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
