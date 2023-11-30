import React from 'react'
import { AbsoluteCenter, Box, Divider } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../app'
import { Posts, ProfileInfo } from '../../widgets'
import { fetchPostsByUser, getAuth, getPostsByUser, getUser, ProfileAvatar } from '../../features'
import { Wrapper } from '../../shared'

import classes from './ProfilePage.module.sass'


const ProfilePage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)
  const isAuth = useAppSelector(getAuth)
  const posts = useAppSelector(getPostsByUser)


  const memoizedPosts = React.useMemo(() => posts, [posts])

  React.useEffect(() => {
    dispatch(fetchPostsByUser(user._id))
  }, [user])

  if (!isAuth) return <p className={classes.text}>You need to log in</p>

  return (
    <Wrapper>
      <ProfileAvatar name={user.name} photo={user.photo} id={user._id} />

      <ProfileInfo canRemove={posts.length === 0} />
      {
        !!posts.length && (
          <>
            <Box position='relative' padding='10'>
              <Divider />
              <AbsoluteCenter bg='white' px='6' className={classes.divider_text}>
                Posts
              </AbsoluteCenter>
            </Box>

            <Posts posts={memoizedPosts} reason='profile' />
          </>
        )
      }
    </Wrapper>
  )
})

export default ProfilePage
