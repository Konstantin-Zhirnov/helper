import React from 'react'
import { useParams } from 'react-router-dom'

import { Reviews } from '../../widgets'
import { clearReviews, fetchAllReviewsByUserId, getReviewsPage, UserInfo } from '../../features'
import { Title, useAppDispatch, useAppSelector, Wrapper } from '../../shared'

const ReviewsPage: React.FC = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()
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
      </Wrapper>
    </>
  )
}

export default ReviewsPage
