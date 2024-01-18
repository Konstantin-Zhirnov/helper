import React from 'react'
import { useLocation } from "react-router-dom"
import cn from "classnames"

import { getReviews, getReviewsByAuthor, Review, ReviewType } from '../../../features'
import { useAppSelector } from "../../../shared";

import classes from './Reviews.module.sass'



const Reviews: React.FC = React.memo(() => {
  const { pathname } = useLocation()

  const reviews = useAppSelector(getReviews)
  const reviewsByAuthor = useAppSelector(getReviewsByAuthor)

  const styles = cn(
      classes.cards,
      {[classes.small]:
        (pathname === '/profile' && reviewsByAuthor.length === 1) ||
        (pathname !== '/profile' && reviews.length < 3)}
  )

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

  return (
    <ul className={styles}>
      {(pathname === '/profile' ? reviewsByAuthor : reviews).map(renderItem)}
    </ul>
  )
})

export { Reviews }