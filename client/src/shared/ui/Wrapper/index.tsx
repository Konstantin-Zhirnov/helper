import React from 'react'

import styles from './Wrapper.module.sass'

interface IProps {
  children: React.ReactNode
  classes?: any
}

const Wrapper: React.FC<IProps> = React.memo(({ children, classes }) => (
  <div className={`${styles.wrapper} ${classes}`}>{children}</div>
))

export { Wrapper }
