import React from 'react'
import { useLocation } from 'react-router-dom'

import {
  getReviews,
  getReviewsByAuthor,
  getReviewsEmptyMessage,
  getReviewsLoading,
  Review,
  ReviewType,
} from '../../../features'
import { Spinner, useAppSelector } from '../../../shared'

import classes from './Reviews.module.sass'

const Reviews: React.FC = React.memo(() => {
  const { pathname } = useLocation()
  const isLoading = useAppSelector(getReviewsLoading)

  const reviews = useAppSelector(getReviews)
  const reviewsByAuthor = useAppSelector(getReviewsByAuthor)
  const reviewsEmptyMessage = useAppSelector(getReviewsEmptyMessage)

  const renderItem = (review: ReviewType) => (
    <Review
      key={review._id}
      _id={review._id}
      title={review.title}
      description={review.description}
      stars={review.stars}
      userId={review.userId._id}
      userName={review.userId.name}
      images={review.images}
      name={review.authorId.name}
      authorId={review.authorId._id}
      time={review.time}
      pathname={pathname}
    />
  )

  if (pathname === '/profile') {
    if (!Boolean(reviewsByAuthor.length)) {
      if (isLoading) {
        return <Spinner />
      } else if (reviewsEmptyMessage) {
        return <p className={classes.text}>{reviewsEmptyMessage}</p>
      }
    } else {
      return <ul className={classes.cards}>{reviewsByAuthor.map(renderItem)}</ul>
    }
  }

  if (pathname.includes('/reviews/')) {
    if (!Boolean(reviews.length)) {
      if (isLoading) {
        return <Spinner />
      } else if (reviewsEmptyMessage) {
        return <p className={classes.text}>{reviewsEmptyMessage}</p>
      }
    } else {
      return (
        <ul className={classes.cards}>
          {reviews.map(renderItem)}
          {isLoading && <Spinner />}
        </ul>
      )
    }
  }
})

export { Reviews }
