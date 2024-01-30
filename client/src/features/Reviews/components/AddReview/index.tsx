import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'

import { AddImages } from '../../../../entities'
import {
  AddButton,
  FormItem,
  Modal,
  SubmitWithImagesButton,
  useAppDispatch,
  useAppSelector,
} from '../../../../shared'

import { fetchAddReview } from '../../model/asyncActions'
import {
  getReviewsLoading,
  getMessage,
  getModal,
  setAlertReviewsMessage,
  setMessage,
  setModal,
  setStarsErrorMessage,
} from '../../model/slice'
import { CreateReviewType } from '../../types'

import { Stars } from './Stars'

import classes from './AddReview.module.sass'

interface IProps {
  authorId: string
  userId: string
}

const AddReview: React.FC<IProps> = React.memo(({ authorId, userId }) => {
  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getModal)
  const message = useAppSelector(getMessage)
  const isLoading = useAppSelector(getReviewsLoading)

  const [currentImages, setCurrentImages] = React.useState([])
  const [images, setImages] = React.useState([])
  const [stars, setStars] = React.useState(0)

  const onOpen = React.useCallback(() => {
    dispatch(setModal('review'))
  }, [])

  const onClose = () => {
    dispatch(setModal(''))
  }

  const schema = yup
    .object()
    .shape({
      title: yup.string().required(),
      description: yup.string().required(),
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Omit<CreateReviewType, 'authorId'>>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<CreateReviewType> = async (data) => {
    if (!isLoading) {
      if (currentImages.length === images.length) {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('stars', stars.toString())
        formData.append('authorId', authorId)
        formData.append('userId', userId)
        await images.forEach((image) => {
          formData.append('images', image.image, image.name)
        })
        if (stars) {
          await dispatch(fetchAddReview(formData))
          setCurrentImages([])
          setImages([])
          setStars(0)
          reset()
        } else {
          dispatch(setStarsErrorMessage(true))
        }
      }
    }
  }

  const onAlertMessage = (text: string) => {
    dispatch(setAlertReviewsMessage(text))
  }

  const onMessage = (text: string) => {
    dispatch(setMessage(text))
  }

  return (
    <>
      <AddButton onOpen={onOpen} />
      {isModal === 'review' && (
        <Modal onClose={onClose} title="Add a review">
          <form onSubmit={handleSubmit(onSubmit)} id="myForm" className={classes.container}>
            <FormItem register={register} errors={errors} name="title" label="Title:" />

            <FormItem register={register} errors={errors} name="description" label="Description:" />

            <Stars stars={stars} setStars={setStars} />

            <AddImages
              currentImages={currentImages}
              setCurrentImages={setCurrentImages}
              images={images}
              setImages={setImages}
              authorId={authorId}
              message={message}
              isLoading={isLoading}
              setMessage={onMessage}
              setAlertMessage={onAlertMessage}
            />

            <SubmitWithImagesButton
              disabled={isLoading}
              currentImagesLength={currentImages.length}
              imagesLength={images.length}
            />
          </form>
        </Modal>
      )}
    </>
  )
})

export { AddReview }
