import React from 'react'
import { useLocation } from "react-router-dom"

import { getReviews, getReviewsByAuthor, Review, ReviewType } from '../../../features'
import { useAppSelector } from "../../../shared";

import classes from './Reviews.module.sass'



const Reviews: React.FC = React.memo(() => {
  const { pathname } = useLocation()

  const reviews = useAppSelector(getReviews)
  const reviewsByAuthor = useAppSelector(getReviewsByAuthor)


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

  if (pathname === '/profile' && !Boolean(reviewsByAuthor.length)) {
    return <p className={classes.text}>You haven't posted any reviews yet</p>
  }

  if (pathname !== '/profile' && !Boolean(reviews.length)) {
    return <p className={classes.text}>There are no reviews about this user yet</p>
  }

  return (
    <ul className={classes.cards}>
      {(pathname === '/profile' ? reviewsByAuthor : reviews).map(renderItem)}
    </ul>
  )
})

export { Reviews }