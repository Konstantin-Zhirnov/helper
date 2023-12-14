import React from 'react'

import {getReviews, getReviewsByAuthor, ReasonReviewType, Review, ReviewType} from '../../features'
import {ReviewSkeletons} from "../../entities";
import {useAppSelector} from "../../shared";

import classes from './Reviews.module.sass'


interface IProps {
  reason: ReasonReviewType
}

const Reviews: React.FC<IProps> = React.memo(({ reason }) => {
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
      userPhoto={review.userId.photo}
      images={review.images}
      name={review.authorId.name}
      photo={review.authorId.photo}
      authorId={review.authorId._id}
      time={review.time}
      reason={reason}
    />
  )

  if (reason === 'all' && !reviews.length) {
    return <ReviewSkeletons />
  }

  return (
    <ul className={classes.cards}>
      {(reason === 'all' ? reviews : reviewsByAuthor).map(renderItem)}
    </ul>
  )
})

export { Reviews }