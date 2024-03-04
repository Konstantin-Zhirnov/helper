import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'

import { AddImages, Categories } from '../../../../entities'
import {
  Button,
  Modal,
  useAppDispatch,
  useAppSelector,
  categories,
  FormItem,
  SubmitWithImagesButton,
} from '../../../../shared'

import {
  getPostsLoading,
  getMessage,
  getPostsModal,
  setAlertPostsMessage,
  setMessage,
  setModal,
} from '../../model/slice'
import { fetchAddPost } from '../../model/asyncActions'
import { CreatePostType } from '../../types'

import classes from './AddPost.module.sass'

interface IProps {
  authorId: string
  styles: any
}

const AddPost: React.FC<IProps> = React.memo(({ authorId, styles }) => {
  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getPostsModal)
  const message = useAppSelector(getMessage)
  const isLoading = useAppSelector(getPostsLoading)

  const [currentImages, setCurrentImages] = React.useState([])
  const [images, setImages] = React.useState([])
  const [category, setCategory] = React.useState(categories[0])

  const handleChange = (value: string) => {
    if (value !== category) {
      setCategory(value)
    }
  }

  const onOpen = React.useCallback(() => {
    dispatch(setModal('post'))
    document.body.style.overflow = 'hidden'
  }, [])

  const onClose = () => {
    dispatch(setModal(''))
    document.body.style.overflow = 'auto'
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
      formData.append('title', data.title.trim())
      formData.append('description', data.description.trim())
      formData.append('location', data.location.trim())
      formData.append('authorId', authorId)
      formData.append('category', category)
      await images.forEach((image) => {
        formData.append('images', image.image, image.name)
      })
      await dispatch(fetchAddPost(formData))
      setCurrentImages([])
      setImages([])
      reset()
    }
  }

  const onAlertMessage = (text: string) => {
    dispatch(setAlertPostsMessage(text))
  }

  const onMessage = (text: string) => {
    dispatch(setMessage(text))
  }

  return (
    <>
      <Button text="Add Post" onOpen={onOpen} styles={styles} />
      {isModal === 'post' && (
        <Modal onClose={onClose} title="Add a post">
          <form onSubmit={handleSubmit(onSubmit)} id="myForm" className={classes.container}>
            <FormItem register={register} errors={errors} name="location" label="Location:" />

            <Categories cb={handleChange} label="Categories:" />

            <FormItem register={register} errors={errors} name="title" label="Title:" />

            <FormItem register={register} errors={errors} name="description" label="Description:" />

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

export { AddPost }
