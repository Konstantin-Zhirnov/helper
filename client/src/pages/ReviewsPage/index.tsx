import React from 'react'
import { useParams } from 'react-router-dom'

import { Reviews } from '../../widgets'
import {
  AddReview,
  clearReviews,
  fetchAllReviewsByUserId,
  getReviewsPage,
  getUserId,
  UserInfo,
} from '../../features'
import { Title, useAppDispatch, useAppSelector, Wrapper } from '../../shared'

const ReviewsPage: React.FC = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const authorId = useAppSelector(getUserId)
  const page = useAppSelector(getReviewsPage)

  React.useEffect(() => {
    dispatch(fetchAllReviewsByUserId({ page, id }))
  }, [page, id])

  React.useEffect(() => {
    return () => {
      dispatch(clearReviews())
    }
  }, [])

  return (
    <>
      <Title text="Reviews" divider />
      <Wrapper>
        <UserInfo id={id} />

        <Reviews />

        {authorId && <AddReview authorId={authorId} userId={id} />}
      </Wrapper>
    </>
  )
}

export default ReviewsPage
