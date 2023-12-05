import React from 'react'
import { ReasonReviewType, Review, ReviewType } from '../../features'

import classes from './Reviews.module.sass'


interface IProps {
  reviews: ReviewType[]
  reason: ReasonReviewType
}

const Reviews: React.FC<IProps> = React.memo(({ reviews, reason }) => {

  const renderItem = (review: ReviewType) => (
    <Review
      key={review._id}
      _id={review._id}
      title={review.title}
      description={review.description}
      stars={review.stars}
      userId={review.userId}
      images={review.images}
      name={review.authorId.name}
      photo={review.authorId.photo}
      authorId={review.authorId._id}
      time={review.time}
      reason={reason}
    />
  )

  return (
    <ul className={classes.cards}>
      {reviews.map(renderItem)}
    </ul>
  )
})

export { Reviews }