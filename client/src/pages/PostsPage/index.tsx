import React from 'react'

import { Hero, Categories, Posts, Final } from '../../widgets'
import { AddPost, clearPages, getAuth, getUserId } from '../../features'
import { useAppDispatch, useAppSelector, Wrapper } from '../../shared'

import { useGetPosts } from '../lib/hooks/useGetPosts'

const PostsPage: React.FC = React.memo(() => {
  useGetPosts()

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getAuth)
  const authorId = useAppSelector(getUserId)

  React.useEffect(() => {
    return () => {
      dispatch(clearPages())
    }
  }, [])

  return (
    <>
      <Hero />
      <Wrapper>
        <Categories />

        <Posts />

        <Final />
      </Wrapper>
    </>
  )
})

export default PostsPage
