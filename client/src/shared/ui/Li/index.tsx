import React from 'react'

import styles from './Li.module.sass'

interface IProps {
  classes?: any
  children: React.ReactNode
}

const Li: React.FC<IProps> = React.memo(({ classes, children }) => {
  return <li className={`${styles.container} ${classes}`}>{children}</li>
})

export { Li }
