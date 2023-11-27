import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'
import * as yup from 'yup'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../../../app'
import { AddButton } from '../../../../shared'

import { getUserId } from '../../../Authorization/model/slice'
import { getModal, setModal } from '../../model/slice'
import { fetchAddPost } from '../../model/asyncActions'
import { CreatePostType } from '../../types'

import { AddImages } from '../AddImages'

import classes from './AddPost.module.sass'


const AddPost: React.FC = React.memo(() => {

  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getModal)
  const authorId = useAppSelector(getUserId)


  const [currentImages, setCurrentImages] = React.useState([])
  const [images, setImages] = React.useState([])


  const onOpen = React.useCallback(() => {
    dispatch(setModal(true))
  }, [])

  const onClose = () => {
    dispatch(setModal(false))
  }

  const schema = yup
    .object()
    .shape({
      title: yup.string().required(),
      description: yup.string().required(),
      location: yup.string().required(),
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Omit<CreatePostType, 'authorId'>>({
    resolver: yupResolver(schema),
  })


  const onSubmit: SubmitHandler<CreatePostType> = async (data) => {
    if (currentImages.length === images.length) {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('location', data.location)
      formData.append('authorId', authorId)
      await images.forEach(image => {
        formData.append('images', image.image, image.name)
      })
      await dispatch(fetchAddPost(formData))
      setCurrentImages([])
      setImages([])
      reset()
    }
  }

  return (
    <>
      <AddButton onOpen={onOpen} />

      <Modal isOpen={isModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)} id='myForm'>
            <ModalHeader className={classes.header}>Add a post</ModalHeader>
            <ModalCloseButton />
            <ModalBody className={classes.container}>
              <span className={classes.input_container}>
                <label htmlFor='location'>Location:</label>
                <Input id='location' size='sm' {...register('location')} autoComplete='off' />
                <ErrorMessage
                  errors={errors as any}
                  name='location'
                  render={({ message }) => <p className={classes.error}>{message}</p>}
                />
              </span>

              <span className={classes.input_container}>
                <label htmlFor='title'>Title:</label>
                <Input id='title' size='sm' {...register('title')} autoComplete='off' />
                <ErrorMessage
                  errors={errors as any}
                  name='title'
                  render={({ message }) => <p className={classes.error}>{message}</p>}
                />
              </span>

              <span className={classes.input_container}>
                <label htmlFor='description'>Description:</label>
                <Textarea id='description' {...register('description')} />
                <ErrorMessage
                  errors={errors as any}
                  name='description'
                  render={({ message }) => <p className={classes.error}>{message}</p>}
                />
              </span>

              <AddImages currentImages={currentImages} setCurrentImages={setCurrentImages} images={images}
                         setImages={setImages} authorId={authorId} />

            </ModalBody>

            <ModalFooter>
              <Button type='submit'
                      className={cn(classes.submit, { [classes.disabled]: currentImages.length !== images.length })}>
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
})

export { AddPost }