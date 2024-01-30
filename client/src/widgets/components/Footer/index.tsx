import React from 'react'
import { useInView } from 'react-intersection-observer'

import { fetchUser, getAuth } from '../../../features'
import { PolicyLink, useAppDispatch, useAppSelector, Wrapper } from '../../../shared'

import { useLocalStorageLocation } from '../../lib/hooks/useLocalStorageLocation'
import { useReviewsCountPage } from '../../lib/hooks/useReviewsCountPage'
import { useMessage } from '../../lib/hooks/useMessage'
import { useReload } from '../../lib/hooks/useReload'

import classes from './Footer.module.sass'

const Footer: React.FC = React.memo(() => {
  const isAuth = useAppSelector(getAuth)

  const { ref, inView } = useInView()
  useReviewsCountPage(inView)

  useLocalStorageLocation()
  useReload()
  useMessage()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (!isAuth) {
      dispatch(fetchUser())
    }
  }, [])

  return (
    <footer className={classes.footer} ref={ref}>
      <Wrapper classes={classes.footer_height}>
        <div className={classes.contact}>
          <p>
            Development by{' '}
            <a href="src/widgets/components/Footer/index" target="_blank">
              Kostya Zhirnov
            </a>
          </p>
          <p>
            Design by{' '}
            <a href="src/widgets/components/Footer/index" target="_blank">
              Vova Vindar
            </a>
          </p>
          {isAuth && <PolicyLink />}
        </div>
        {!isAuth && <PolicyLink />}
      </Wrapper>
    </footer>
  )
})

export { Footer }
