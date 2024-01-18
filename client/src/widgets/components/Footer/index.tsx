import React from 'react'
import { useInView } from 'react-intersection-observer'

import { fetchUser } from '../../../features'
import { useAppDispatch, Wrapper } from '../../../shared'

import { useLocalStorageLocation } from '../../lib/hooks/useLocalStorageLocation'
import { useCountPage } from '../../lib/hooks/useCountPage'
import { useMessage } from '../../lib/hooks/useMessage'
import { useReload } from '../../lib/hooks/useReload'

import classes from './Footer.module.sass'


const Footer: React.FC = React.memo(() => {
  const { ref, inView } = useInView()
  useCountPage(inView)

  useLocalStorageLocation()
  useReload()
  useMessage()

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <footer className={classes.footer} ref={ref}>
      <Wrapper classes={classes.footer_height}>
        <div className={classes.contact}>
          <p>Development by <a href="src/widgets/components/Footer/index" target="_blank">Kostya Zhirnov</a></p>
          <p>Design by <a href="src/widgets/components/Footer/index" target="_blank">Vova Vindar</a></p>
        </div>
        <p>Privacy Policy</p>
      </Wrapper>
    </footer>
  )
})

export { Footer }
