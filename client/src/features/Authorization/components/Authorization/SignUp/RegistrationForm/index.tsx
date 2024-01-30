import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import cn from 'classnames'

import { PolicyLink, UserType } from '../../../../../../shared'
import { FormButton, FormItem, useAppDispatch, useAppSelector } from '../../../../../../shared'

import { fetchRegistration } from '../../../../model/asyncActions'
import { getLoading, getRegistrationErrorMessage } from '../../../../model/slice'

import classes from './RegistrationForm.module.sass'

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const registrationErrorMessage = useAppSelector(getRegistrationErrorMessage)
  const isLoading = useAppSelector(getLoading)

  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserType>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    if (!isLoading) {
      await dispatch(
        fetchRegistration({
          _id: '',
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          phone: '',
          photo: '',
          whatsapp: '',
          telegram: '',
          viber: '',
          isActivated: false,
          linkForActivated: '',
          changePasswordLink: '',
          stars: 0,
          countReviews: 0,
          paid: true,
          paidTime: '',
        }),
      )
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <FormItem register={register} errors={errors} name="name" label="Name:" />

      <FormItem register={register} errors={errors} name="email" label="Email:" />

      <FormItem register={register} errors={errors} name="password" label="Password:" />

      <PolicyLink />

      <p
        className={cn(classes.serverError, {
          [classes.visible]: registrationErrorMessage,
          [classes.hidden]: !registrationErrorMessage,
        })}
      >
        {registrationErrorMessage}
      </p>

      <FormButton disabled={isLoading} />
    </form>
  )
}

export { RegistrationForm }
