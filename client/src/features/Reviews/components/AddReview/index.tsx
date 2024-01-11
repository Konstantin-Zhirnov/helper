import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'
import * as yup from 'yup'
import ReactStars from 'react-rating-stars-component'
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md'

import { AddImages } from '../../../../entities'
import { AddButton, useAppDispatch, useAppSelector } from '../../../../shared'

import { fetchAddReview } from '../../model/asyncActions'
import { getMessage, getModal, setAlertReviewsMessage, setMessage, setModal } from '../../model/slice'
import { CreateReviewType } from '../../types'

import classes from './AddReview.module.sass'


interface IProps {
  authorId: string
  userId: string
}

const AddReview: React.FC<IProps> = React.memo(({ authorId, userId }) => {

  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getModal)
  const message = useAppSelector(getMessage)


  const [currentImages, setCurrentImages] = React.useState([])
  const [images, setImages] = React.useState([])
  const [stars, setStars] = React.useState(0)
  const [isMessage, setIsMessage] = React.useState(false)


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
    if (currentImages.length === images.length) {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('stars', stars.toString())
      formData.append('authorId', authorId)
      formData.append('userId', userId)
      await images.forEach(image => {
        formData.append('images', image.image, image.name)
      })
      if (stars) {
        await dispatch(fetchAddReview(formData))
        setCurrentImages([])
        setImages([])
        setStars(0)
        reset()
      } else {
        setIsMessage(true)
      }
    }
  }

  const onAlertMessage = (text) => {
    dispatch(setAlertReviewsMessage(text))
  }

  const onMessage = (text) => {
    dispatch(setMessage(text))
  }

  const ratingChanged = (newRating) => {
    setStars(newRating)
  }

  React.useEffect(() => {
    if (isMessage && stars) {
      setIsMessage(false)
    }
  }, [isMessage, stars])

  return (
    <>
      <AddButton onOpen={onOpen} />

      <div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} id='myForm'>
            <p className={classes.header}>Add a post</p>

            <div className={classes.container}>

              <span className={classes.input_container}>
                <label htmlFor='title'>Title:</label>
                <input id='title' {...register('title')} autoComplete='off' />
                <ErrorMessage
                  errors={errors as any}
                  name='title'
                  render={({ message }) => <p className={classes.error}>{message}</p>}
                />
              </span>

              <span className={classes.input_container}>
                <label htmlFor='description'>Description:</label>
                <textarea id='description' {...register('description')} />
                <ErrorMessage
                  errors={errors as any}
                  name='description'
                  render={({ message }) => <p className={classes.error}>{message}</p>}
                />
              </span>

              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={28}
                emptyIcon={<MdOutlineStarBorder />}
                fullIcon={<MdOutlineStar />}
                activeColor='#ffd700'
              />
              <div className={classes.stars_error_container}>
                {isMessage && <p className={classes.stars_error_text}>Select the number of stars</p>}
              </div>

              <AddImages
                currentImages={currentImages}
                setCurrentImages={setCurrentImages}
                images={images}
                setImages={setImages}
                authorId={authorId}
                message={message}
                setMessage={onMessage}
                setAlertMessage={onAlertMessage}
              />

            </div>

            <div>
              <button type='submit'
                      className={cn(classes.submit, { [classes.disabled]: currentImages.length !== images.length })}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
})

export { AddReview }