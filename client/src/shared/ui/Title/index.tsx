import React from 'react'

import { Wrapper } from '../Wrapper'

import classes from './Title.module.sass'

interface IProps {
  text: string
  divider?: boolean
}

const Title: React.FC<IProps> = React.memo(({ text, divider }) => {
  return (
    <Wrapper>
      <h1 className={classes.title}>{text}</h1>
      {divider && <div className={classes.divider} />}
    </Wrapper>
  )
})

export { Title }
