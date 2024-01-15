import React from 'react'

import { ProfileInfo, ProfileMenu } from '../../widgets'
import {
  fetchPostsByUser,
  fetchReviewsByAuthor,
  getActiveScreen,
  getAuth,
  getUser
} from '../../features'
import { useAppDispatch, useAppSelector, Wrapper } from '../../shared'

import classes from './ProfilePage.module.sass'
import {useNavigate} from "react-router-dom";


const ProfilePage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)
  const isAuth = useAppSelector(getAuth)
  const navigate = useNavigate()
  const activeItem = useAppSelector(getActiveScreen)

  React.useEffect(() => {
    if (user._id) {
      dispatch(fetchPostsByUser(user._id))
      dispatch(fetchReviewsByAuthor(user._id))
    }
  }, [user?._id])

  React.useEffect(() => {
    if (user._id) {
      dispatch(fetchPostsByUser(user._id))
      dispatch(fetchReviewsByAuthor(user._id))
    }
    if (!isAuth) {
      navigate('/')
    }
  }, [isAuth])


  // if (!isAuth) return <p className={classes.text}>You need to log in</p>


  return (
      <>
        <Wrapper>
          <h1 className={classes.title}>Settings</h1>
          <div className={classes.divider}/>
        </Wrapper>
        <Wrapper classes={classes.wrapper}>
          <ProfileMenu activeItem={activeItem}/>

          <ProfileInfo activeItem={activeItem}/>
        </Wrapper>
      </>

  )
})

export default ProfilePage
