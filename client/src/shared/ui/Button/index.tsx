import React from 'react'

import classes from './Button.module.sass'

interface IProps {
  text: string
  onOpen: () => void
  styles?: any
}

const Button: React.FC<IProps> = React.memo(({ text, onOpen, styles }) => {
  const handleClick = () => {
    onOpen()
  }

  return (
    <button onClick={handleClick} className={`${classes.btn} ${styles}`}>
      {text}
    </button>
  )
})

export { Button }
