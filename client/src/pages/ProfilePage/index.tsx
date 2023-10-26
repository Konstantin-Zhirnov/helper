import React from 'react'
import { Heading, Text } from '@chakra-ui/react'

import { useAppSelector } from '../../app'
import { ProfileInfo } from '../../widgets'
import { getUser, ProfileAvatar, getAuth, getAlertMessage } from '../../features'
import { Wrapper, useMessage } from '../../shared'

import classes from './ProfilePage.module.sass'


const ProfilePage: React.FC = () => {
  const user = useAppSelector(getUser)
  const isAuth = useAppSelector(getAuth)
  const message = useAppSelector(getAlertMessage)
  useMessage(message)

  if (!isAuth) return <Text fontSize='2xl' className={classes.text}>You need to log in</Text>

  return (
    <Wrapper>
      <Heading as="h1" className={classes.title}>
        Profile page
      </Heading>

      <ProfileAvatar name={user.name} photo={user.photo} id={user._id}/>

      <ProfileInfo/>
    </Wrapper>
  )
}

export default ProfilePage
