import React from 'react'

import {Avatar, Stars, useAppDispatch, useAppSelector} from '../../../../shared'

import { getUser } from '../../model/slice'
import { fetchUser } from '../../model/asyncActions'

import classes from './UserInfo.module.sass'


interface IProps {
  id: string
}

const UserInfo: React.FC<IProps> = React.memo(({ id }) => {

  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)

  React.useEffect(() => {
    dispatch(fetchUser(id))
  }, [id])

  return (
    <div className={classes.container}>
        <span>
          <Avatar photo={user.photo} size="md"/>
          <p className={classes.name}>{user.name}</p>
          <Stars stars={user.stars} countReviews={user.countReviews} />
        </span>
    </div>
  )
})

export { UserInfo }
