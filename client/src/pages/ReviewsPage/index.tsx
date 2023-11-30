import React from 'react'
import { useParams } from 'react-router-dom'

import { AddReview, getUserId, UserInfo } from '../../features'
import { Wrapper } from '../../shared'
import { useAppSelector } from '../../app'


const ReviewsPage: React.FC = () => {
  const { id } = useParams()
  const authorId = useAppSelector(getUserId)
  return (
    <Wrapper>
      <UserInfo id={id} />
      {authorId && <AddReview authorId={authorId} userId={id} />}
    </Wrapper>
  )
}

export default ReviewsPage
