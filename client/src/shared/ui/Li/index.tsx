import React from 'react'

import classes from './Li.module.sass'


interface IProps {
  custom?: number
  dataTestId?: string
  children: React.ReactNode
}


const Li: React.FC<IProps> = ({ children }) => {
  return <li className={classes.container}>{children}</li>
}

export { Li }
