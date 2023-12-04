import React from 'react'
import { useParams } from 'react-router-dom'


import { AddReview, fetchAllReviewsByUserId, getReviewsPage, getUserId, UserInfo } from '../../features'
import { useAppDispatch, useAppSelector, Wrapper } from '../../shared'


const ReviewsPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const authorId = useAppSelector(getUserId)
  const page = useAppSelector(getReviewsPage)

  React.useEffect(() => {
    dispatch(fetchAllReviewsByUserId({ page, id }))
  }, [page, id])

  return (
    <Wrapper>
      <UserInfo id={id} />
      {authorId && <AddReview authorId={authorId} userId={id} />}
    </Wrapper>
  )
}

export default ReviewsPage
