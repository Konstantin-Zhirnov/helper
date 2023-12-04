import React from 'react'
import { Heading } from '@chakra-ui/react'


import { Posts } from '../../widgets'
import { AddPost, getAuth, getPosts, getUserId, Search } from '../../features'
import { useAppSelector, useMatchMedia, Wrapper } from '../../shared'

import classes from './PostPage.module.sass'


const PostsPage: React.FC = React.memo(() => {
  const { isMobile } = useMatchMedia()

  const isAuth = useAppSelector(getAuth)
  const posts = useAppSelector(getPosts)
  const authorId = useAppSelector(getUserId)

  const memoizedPosts = React.useMemo(() => posts, [posts])

  return (
    <Wrapper>

      {isMobile && <div className={classes.search_container}><Search isMobile={isMobile} /></div>}

      <Heading as='h1' size='lg' className={classes.title}>
        Helper - application for people
      </Heading>

      <p>This application is intended for people who need help and people who can provide this help. The main purpose of
        this application is to bring these people together. That`s why HELPER is an app for all people.</p>

      <Posts posts={memoizedPosts} reason='all' />
      {isAuth && <AddPost authorId={authorId} />}
    </Wrapper>
  )
})

export default PostsPage
