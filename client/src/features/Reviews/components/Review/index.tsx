import React from 'react'
import { Avatar, Divider, IconButton, Text } from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'

import { Li, Stars, useAppDispatch } from '../../../../shared'

import { fetchRemoveReview } from '../../model/asyncActions'
import { ReasonReviewType } from '../../types'
import { Images } from './Images'

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

  const memoizedImages = React.useMemo(() => images, [images])

  return (
    <Li classes={classes.container}>
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

        <p className={classes.description}>{description}</p>

        <div className={classes.footer}>
          <div className={classes.avatar_container}>
            <Avatar size='sm' name={name} src={`${photo}?${new Date().getTime()}`} />
            <p className={classes.name}>{name}</p>
          </div>

          <p className={classes.time}>{new Date(time).toLocaleDateString()}</p>
        </div>

        {
          !!images.length && <Images imagesSrcArray={memoizedImages} />
        }
      </div>
    </Li>
  )
})

export { Review }
