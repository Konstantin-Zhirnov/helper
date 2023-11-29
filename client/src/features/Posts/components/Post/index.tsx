import React from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar, Divider, IconButton, Text } from '@chakra-ui/react'
import { BsGeoAltFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

import { useAppDispatch, useAppSelector } from '../../../../app'
import { Li, Stars } from '../../../../shared'
import { getUserId } from '../../../Authorization/model/slice'
import { fetchRemovePost } from '../../model/asyncActions'

import { ReasonType } from '../../types'
import { Images } from './Images'
import { ContactInformation } from './ContactInformation'
import { EditableInput } from './EditableInput'

import classes from './Post.module.sass'


interface IProps {
  _id?: string
  title: string
  description: string
  location: string
  time: number
  postAuthorId: string
  name: string
  photo: string
  email: string
  phone: string
  whatsapp: string
  telegram: string
  stars: number
  countReviews: number
  images: string[]
  reason: ReasonType
}

const Post: React.FC<IProps> = React.memo(({
                                             _id,
                                             title,
                                             description,
                                             location,
                                             time,
                                             postAuthorId,
                                             name,
                                             photo,
                                             email,
                                             phone,
                                             whatsapp,
                                             telegram,
                                             stars,
                                             countReviews,
                                             images,
                                             reason,
                                           }) => {

  const dispatch = useAppDispatch()
  const authorId = useAppSelector(getUserId)

  const removePost = () => {
    dispatch(fetchRemovePost({ _id, folder: authorId }))
  }

  return (
    <Li>
      <div className={classes.container}>
        <div className={classes.user}>
          <Avatar size='xl' name={name} src={`${photo}?${new Date().getTime()}`} />
          <Text fontSize='lg' className={classes.name}>{name}</Text>
          <NavLink to={`/reviews/${postAuthorId}`} className={classes.stars}>
            <Stars stars={stars} countReviews={countReviews} />
          </NavLink>
        </div>
        <div className={classes.info}>
          {
            reason === 'profile' && (
              <IconButton
                isRound={true}
                variant='solid'
                aria-label='Remove post button'
                fontSize='20px'
                className={classes.remove}
                icon={<MdDelete />}
                onClick={removePost}
              />
            )
          }

          {
            reason === 'profile'
              ? <EditableInput _id={_id} defaultValue={title} field='title' />
              : <Text fontSize='lg' className={classes.title}>{title}</Text>
          }


          <Divider className={classes.divider} />

          {
            reason === 'profile'
              ? <EditableInput _id={_id} defaultValue={description} field='description' />
              : <Text fontSize='md'>{description}</Text>
          }


          <div className={classes.footer}>
            {
              reason === 'profile'
                ? <EditableInput _id={_id} defaultValue={location} field='location' />
                : <Text className={classes.location}><BsGeoAltFill />{location}</Text>
            }


            <Text className={classes.time}>{new Date(time).toLocaleDateString()}</Text>
          </div>
        </div>
      </div>
      {
        reason === 'profile'
          ? <Images imagesSrcArray={images} _id={_id} reason={reason} />
          : !!images.length
            ? <Images imagesSrcArray={images} _id={_id} reason={reason} />
            : null
      }
      <ContactInformation email={email} phone={phone} whatsapp={whatsapp} telegram={telegram} />
    </Li>
  )
})

export { Post }
