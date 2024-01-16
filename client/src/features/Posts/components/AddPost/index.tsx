import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import cn from 'classnames'
import * as yup from 'yup'

import { AddImages, Categories } from '../../../../entities'
import {AddButton, Modal, useAppDispatch, useAppSelector, categories, FormItem} from '../../../../shared'

import { getMessage, getModal, setAlertPostsMessage, setMessage, setModal } from '../../model/slice'
import { fetchAddPost } from '../../model/asyncActions'
import { CreatePostType } from '../../types'

import classes from './AddPost.module.sass'




interface IProps {
  authorId: string
}

const AddPost: React.FC<IProps> = React.memo(({ authorId }) => {

  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getModal)
  const message = useAppSelector(getMessage)


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
    document.body.style.overflow = 'hidden';
  }, [])

  const onClose = () => {
    dispatch(setModal(''))
    document.body.style.overflow = 'auto';
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
      formData.append('category', category)
      await images.forEach(image => {
        formData.append('images', image.image, image.name)
      })
      await dispatch(fetchAddPost(formData))
      setCurrentImages([])
      setImages([])
      reset()
    }
  }

  const onAlertMessage = (text) => {
    dispatch(setAlertPostsMessage(text))
  }

  const onMessage = (text) => {
    dispatch(setMessage(text))
  }

  return (
    <>
      <AddButton onOpen={onOpen} />
      {
        isModal === 'post' && (
          <Modal onClose={onClose} title="Add a post">
            <form onSubmit={handleSubmit(onSubmit)} id='myForm' className={classes.container}>
              <FormItem register={register} errors={errors} name="location" label='Location:'/>

              <Categories cb={handleChange} label="Categories:"/>

              <FormItem register={register} errors={errors} name="title" label='Title:'/>

              <FormItem register={register} errors={errors} name="description" label='Description:'/>

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

              <button type='submit'
                      className={cn(classes.submit, { [classes.disabled]: currentImages.length !== images.length })}>
                Submit
              </button>

            </form>
          </Modal>
        )
      }
    </>
  )
})

export { AddPost }