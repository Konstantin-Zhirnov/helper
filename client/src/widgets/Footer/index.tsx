import React from 'react'
import { useInView } from 'react-intersection-observer'

import { fetchUser } from '../../features'
import { useAppDispatch, Wrapper } from '../../shared'

import { useLocalStorageLocation } from '../lib/hooks/useLocalStorageLocation'
import { useNewAvatar } from '../lib/hooks/useNewAvatar'
import { useCountPage } from '../lib/hooks/useCountPage'
import { useMessage } from '../lib/hooks/useMessage'

import classes from './Footer.module.sass'


const Footer: React.FC = React.memo(() => {
  const { ref, inView } = useInView()
  useCountPage(inView)

  useLocalStorageLocation()
  useNewAvatar()
  useMessage()


  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <footer className={classes.footer} ref={ref}>
      <Wrapper classes={classes.footer_height}>
        <p>You can support the project using the email:
          <span className={classes.email}> kostya.zhirnov@gmail.com</span>
        </p>
      </Wrapper>
    </footer>
  )
})

export { Footer }
