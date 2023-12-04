import React from 'react'
import { Avatar, Heading } from '@chakra-ui/react'

import { Stars, useAppDispatch, useAppSelector } from '../../../../shared'

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
    <>
      <Heading as='h1' size='lg' className={classes.title}>
        Reviews about {user.name}
      </Heading>

      <div className={classes.container}>
        <span>
           <Avatar size='lg' name={user.name} src={user.photo} />
            <Stars stars={user.stars} countReviews={user.countReviews} />
        </span>
      </div>
    </>

  )
})

export { UserInfo }
