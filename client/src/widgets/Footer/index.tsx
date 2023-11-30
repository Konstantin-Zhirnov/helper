import React from 'react'
import { useLocation } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

import { useAppDispatch, useAppSelector } from '../../app'
import {
  fetchPosts,
  fetchPostsByUser,
  fetchUser,
  getAlertAuthorizationMessage,
  getAlertPostsMessage,
  getIsNewAvatar,
  getLocation,
  getPage,
  getPages,
  getSearch,
  getUserId,
  setAlertAuthorizationMessage,
  setAlertPostsMessage,
  setIsNewAvatar,
  setLocation,
  setPage,
} from '../../features'
import { useMessage, Wrapper } from '../../shared'


import classes from './Footer.module.sass'


const Footer: React.FC = React.memo(() => {
  const { pathname } = useLocation()

  const dispatch = useAppDispatch()
  const page = useAppSelector(getPage)
  const pages = useAppSelector(getPages)
  const search = useAppSelector(getSearch)
  const location = useAppSelector(getLocation)
  const isNewAvatar = useAppSelector(getIsNewAvatar)
  const userId = useAppSelector(getUserId)

  const authorizationMessage = useAppSelector(getAlertAuthorizationMessage)
  const postsMessage = useAppSelector(getAlertPostsMessage)


  const clear = () => {
    dispatch(setAlertAuthorizationMessage(''))
    dispatch(setAlertPostsMessage(''))
  }

  useMessage(authorizationMessage || postsMessage, clear)


  const { ref, inView } = useInView({
    rootMargin: '100px',
  })


  React.useEffect(() => {
    if (location) {
      dispatch(fetchPosts({ page, search, location }))
    }
  }, [page, search, location])

  React.useEffect(() => {
    const location = localStorage.getItem('location')
    if (location) {
      dispatch(setLocation(location))
    } else {
      localStorage.setItem('location', 'Nanaimo')
      dispatch(setLocation('Nanaimo'))
    }
    dispatch(fetchUser())
  }, [])


  React.useEffect(() => {
    if (inView && pages > page && pathname === '/') {
      dispatch(setPage(page + 1))
    }
  }, [inView])

  React.useEffect(() => {
    if (isNewAvatar) {
      dispatch(fetchPosts({ page, search, location }))
      dispatch(fetchPostsByUser(userId))
      dispatch(setIsNewAvatar(false))
    }
  }, [page, search, location, isNewAvatar])


  return (
    <footer className={classes.footer} ref={ref}>
      <Wrapper classes={classes.footer_height}>
        <p>You can support the project using the email: <span
          className={classes.email}> kostya.zhirnov@gmail.com</span></p>
      </Wrapper>
    </footer>
  )
})

export { Footer }
