import React from 'react'

import { useAppDispatch, useAppSelector } from '../../app'
import { Posts } from '../../widgets'
import { AddPost, fetchPosts, getAuth, getLimit, getLocation, getPosts, getSkip } from '../../features'
import { Wrapper } from '../../shared'


const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const skip = useAppSelector(getSkip)
  const limit = useAppSelector(getLimit)
  const location = useAppSelector(getLocation)
  const isAuth = useAppSelector(getAuth)
  const posts = useAppSelector(getPosts)

  React.useEffect(() => {
    dispatch(fetchPosts({ skip, limit, location }))
  }, [skip, limit, location])

  return (
    <Wrapper>
      <Posts posts={posts} reason='all' />
      {isAuth && <AddPost />}
    </Wrapper>
  )
}

export default PostsPage
