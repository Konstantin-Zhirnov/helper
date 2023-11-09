import React from 'react'
import { Avatar, Divider, IconButton, Text } from '@chakra-ui/react'
import { BsGeoAltFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'


import { MotionLi } from '../../../../shared'

import { ReasonType } from '../../types'
import { Images } from './Images'
import { ContactInformation } from './ContactInformation'
import { EditableInput } from './EditableInput'

import classes from './Post.module.sass'
import { fetchRemovePost } from '../../model/asyncActions'
import { useAppDispatch, useAppSelector } from '../../../../app'
import { getUserId } from '../../../Authorization/model/slice'


interface IProps {
  _id?: string
  index: number
  title: string
  description: string
  location: string
  time: number
  name: string
  photo: string
  email: string
  phone: string
  whatsapp: string
  telegram: string
  images: string[]
  reason: ReasonType
}

const Post: React.FC<IProps> = ({
                                  _id,
                                  index,
                                  title,
                                  description,
                                  location,
                                  time,
                                  name,
                                  photo,
                                  email,
                                  phone,
                                  whatsapp,
                                  telegram,
                                  images,
                                  reason,
                                }) => {

  const dispatch = useAppDispatch()
  const authorId = useAppSelector(getUserId)

  const removePost = () => {
    dispatch(fetchRemovePost({ _id, folder: authorId }))
  }

  return (
    <MotionLi custom={index + 1}>
      <div className={classes.container}>
        <div className={classes.user}>
          <Avatar size='xl' name={name} src={`${photo}?${new Date().getTime()}`} />
          <Text fontSize='lg' className={classes.name}>{name}</Text>
          <div className={classes.stars}>Stars</div>
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
    </MotionLi>
  )
}

export { Post }
