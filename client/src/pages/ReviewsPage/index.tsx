import React from 'react'
import { useParams } from 'react-router-dom'

import { Reviews } from '../../widgets'
import {
  AddReview,
  clearReviews,
  fetchAllReviewsByUserId,
  getReviews,
  getReviewsPage,
  getUserId,
  UserInfo,
} from '../../features'
import { ReviewSkeletons } from '../../entities'
import { useAppDispatch, useAppSelector, Wrapper } from '../../shared'


const ReviewsPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const authorId = useAppSelector(getUserId)
  const page = useAppSelector(getReviewsPage)
  const reviews = useAppSelector(getReviews)


  const memoizedReviews = React.useMemo(() => reviews, [reviews])

  React.useEffect(() => {
    dispatch(fetchAllReviewsByUserId({ page, id }))
  }, [page, id])

  React.useEffect(() => {
    return () => {
      dispatch(clearReviews())
    }
  }, [])

  return (
    <Wrapper>
      <UserInfo id={id} />

      {
        !memoizedReviews.length
          ? <ReviewSkeletons />
          : <Reviews reviews={memoizedReviews} reason='all' />
      }

      {authorId && <AddReview authorId={authorId} userId={id} />}
    </Wrapper>
  )
}

export default ReviewsPage
