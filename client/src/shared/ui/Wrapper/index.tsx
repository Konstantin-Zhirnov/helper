import React from 'react'

import styles from './Wrapper.module.sass'

const Wrapper = ({ children, classes }: { children: React.ReactNode; classes?: any }) => (
  <div className={`${styles.wrapper} ${classes}`}>{children}</div>
)

export default Wrapper
