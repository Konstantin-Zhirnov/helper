import React from 'react'
import cn from 'classnames'

import { FaCircleUser } from 'react-icons/fa6'

import classes from './Avatar.module.sass'

interface IProps {
  photo: string
  isReload?: boolean
  size: 'sm' | 'md'
}

const Avatar: React.FC<IProps> = React.memo(({ photo, isReload, size }) => {
  const [_, setReload] = React.useState(0)

  React.useEffect(() => {
    if (isReload) {
      setReload((prevState) => prevState + 1)
    }
  }, [isReload])

  if (!photo) return <FaCircleUser size={size === 'sm' ? 30 : 90} className={classes.icon} />

  return (
    <div className={cn(classes.container, classes[size])}>
      <img alt="user`s photo" src={`${photo}?${new Date().getTime()}`} className={classes.image} />
    </div>
  )
})

export { Avatar }
