import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'
import * as yup from 'yup'

import { AddImages } from '../../../../entities'
import {AddButton, Modal, useAppDispatch, useAppSelector, categories, Select} from '../../../../shared'

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

  const handleChange = (value) => {
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
              <div className={classes.input_container}>
                <label htmlFor='location' className={classes.input_label}>Location:</label>
                <input id='location' {...register('location')} autoComplete='off' className={classes.input}/>
                <ErrorMessage
                  errors={errors as any}
                  name='location'
                  render={({ message }) => <p className={classes.error}>{message}</p>}
                />
              </div>

              <div className={classes.input_container}>
                <label className={classes.input_label}>Category:</label>
                <Select options={categories} defaultValue={categories[0]} cb={handleChange} category/>
              </div>

              <div className={classes.input_container}>
                <label htmlFor='title' className={classes.input_label}>Title:</label>
                <input id='title' {...register('title')} autoComplete='off' className={classes.input}/>
                <ErrorMessage
                  errors={errors as any}
                  name='title'
                  render={({ message }) => <p className={classes.error}>{message}</p>}
                />
              </div>

              <div className={classes.input_container}>
                <label htmlFor='description' className={classes.input_label}>Description:</label>
                <textarea id='description' {...register('description')} className={cn(classes.input, classes.text)}/>
                <ErrorMessage
                  errors={errors as any}
                  name='description'
                  render={({ message }) => <p className={classes.error}>{message}</p>}
                />
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