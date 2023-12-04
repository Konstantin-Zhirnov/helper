import React from 'react'
import { Divider, IconButton, Text } from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'

import { Li, Stars, useAppDispatch } from '../../../../shared'

import { fetchRemoveReview } from '../../model/asyncActions'
import { ReasonReviewType } from '../../types'


import classes from './Review.module.sass'


interface IProps {
  _id?: string
  title: string
  description: string
  stars: number
  images: string[]
  name: string
  photo: string
  authorId: string
  time: number
  reason: ReasonReviewType
}

const Review: React.FC<IProps> = React.memo(({
                                               _id,
                                               title,
                                               description,
                                               stars,
                                               images,
                                               name,
                                               photo,
                                               authorId,
                                               time,
                                               reason,
                                             }) => {

  const dispatch = useAppDispatch()

  const removePost = () => {
    dispatch(fetchRemoveReview({ _id, stars, authorId }))
  }

  return (
    <Li>
      <div className={classes.container}>
        <div className={classes.user}>
          <Stars stars={stars} countReviews={1} />
        </div>
        <div className={classes.info}>
          {
            reason === 'user' && (
              <IconButton
                isRound={true}
                variant='solid'
                aria-label='Remove review button'
                fontSize='20px'
                className={classes.remove}
                icon={<MdDelete />}
                onClick={removePost}
              />
            )
          }


          <Text fontSize='lg' className={classes.title}>{title}</Text>


          <Divider className={classes.divider} />

          <Text fontSize='md'>{description}</Text>

        </div>
      </div>

    </Li>
  )
})

export { Review }
