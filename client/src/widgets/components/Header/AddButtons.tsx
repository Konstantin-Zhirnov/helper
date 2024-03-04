import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { AddPost, AddReview, getAuth, getUserId } from '../../../features'
import { useAppSelector } from '../../../shared'

interface IProps {
  styles?: any
}
const AddButtons: React.FC<IProps> = React.memo(({ styles }) => {
  const { pathname } = useLocation()

  const isAuth = useAppSelector(getAuth)
  const authorId = useAppSelector(getUserId)
  const { id } = useParams()

  console.log('id', id)

  if (!isAuth) return null

  if (pathname === '/') return <AddPost authorId={authorId} styles={styles} />

  if (pathname.includes('/reviews/'))
    return <AddReview authorId={authorId} userId={id} styles={styles} />
})

export { AddButtons }
