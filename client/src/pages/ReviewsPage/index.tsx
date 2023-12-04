import React from 'react'
import { useParams } from 'react-router-dom'


import { AddReview, fetchAllReviewsByUserId, getReviews, getReviewsPage, getUserId, UserInfo } from '../../features'
import { useAppDispatch, useAppSelector, Wrapper } from '../../shared'
import { Reviews } from '../../widgets'


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

  return (
    <Wrapper>
      <UserInfo id={id} />
      {authorId && <AddReview authorId={authorId} userId={id} />}
      <Reviews reviews={memoizedReviews} reason='all' />
    </Wrapper>
  )
}

export default ReviewsPage
