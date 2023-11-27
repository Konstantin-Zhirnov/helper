import React from 'react'
import { AbsoluteCenter, Box, Divider, Text } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../app'
import { Posts, ProfileInfo } from '../../widgets'
import { fetchPostsByUser, getAlertMessage, getAuth, getPostsByUser, getUser, ProfileAvatar } from '../../features'
import { useMessage, Wrapper } from '../../shared'

import classes from './ProfilePage.module.sass'


const ProfilePage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)
  const isAuth = useAppSelector(getAuth)
  const message = useAppSelector(getAlertMessage)
  const posts = useAppSelector(getPostsByUser)
  useMessage(message)

  const memoizedPosts = React.useMemo(() => posts, [posts])

  React.useEffect(() => {
    dispatch(fetchPostsByUser(user._id))
  }, [user])

  if (!isAuth) return <Text fontSize='2xl' className={classes.text}>You need to log in</Text>

  return (
    <Wrapper>
      <ProfileAvatar name={user.name} photo={user.photo} id={user._id} />

      <ProfileInfo />
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
