import React from 'react'
import { useLocation } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

import { fetchUser } from '../../features'
import { useAppDispatch, Wrapper } from '../../shared'

import { useLocalStorageLocation } from '../lib/hooks/useLocalStorageLocation'
import { useNewAvatar } from '../lib/hooks/useNewAvatar'
import { useGetPosts } from '../lib/hooks/useGetPosts'
import { useMessage } from '../lib/hooks/useMessage'
import { useCountPage } from '../lib/hooks/useCountPage'

import classes from './Footer.module.sass'


const Footer: React.FC = React.memo(() => {
  const { pathname } = useLocation()
  const { ref, inView } = useInView({
    rootMargin: '100px',
  })

  useLocalStorageLocation()
  useNewAvatar()
  useGetPosts()
  useMessage()
  useCountPage(inView, pathname)


  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchUser())
  }, [])


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
