import React from 'react'
import { MdLogin, MdLogout } from 'react-icons/md'

import classes from './Avatar.module.sass'
import cn from "classnames";

interface IProps {
  photo: string
  isReload: boolean
  size: 'sm' | 'md'
}

const Avatar: React.FC<IProps> = React.memo(({ photo, isReload, size }) => {

  const [_, setReload] = React.useState(0)

  React.useEffect(() => {
    if(isReload) {
      setReload(prevState => prevState + 1)
    }
  }, [isReload])


  return (
      <div className={cn(classes.container, classes[size])}>
        <img alt='user`s photo' src={`${photo}?${new Date().getTime()}`} className={classes.image}/>
      </div>
  )
})

export { Avatar }