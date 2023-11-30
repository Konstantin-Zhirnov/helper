import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@chakra-ui/react'
import * as yup from 'yup'

import { useAppDispatch } from '../../../../app'
import type { UserType } from '../../../../shared'

import { fetchRegistration } from '../../model/asyncActions'

import { PasswordInput } from '../PasswordInput'

import classes from './RegistrationForm.module.sass'


const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch()


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

    await dispatch(
      fetchRegistration({
        _id: '',
        name: data.name,
        email: data.email.toLowerCase(),
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <span className={classes.input_container}>
        <label htmlFor='name'>Name:</label>
        <Input id='name' size='sm' {...register('name')} autoComplete='off' />
        <ErrorMessage
          errors={errors as any}
          name='name'
          render={({ message }) => <p className={classes.error}>{message}</p>}
        />
      </span>

      <span className={classes.input_container}>
        <label htmlFor='email'>Email:</label>
        <Input id='email' size='sm' {...register('email')} autoComplete='off' />
        <ErrorMessage
          errors={errors as any}
          name='email'
          render={({ message }) => <p className={classes.error}>{message}</p>}
        />
      </span>

      <span className={classes.input_container}>
        <label htmlFor='password'>Password:</label>
        <PasswordInput register={register} />

        <ErrorMessage
          errors={errors as any}
          name='password'
          render={({ message }) => <p className={classes.error}>{message}</p>}
        />
      </span>

      <Button type='submit' className={classes.btn}>
        Submit
      </Button>
    </form>
  )
}

export { RegistrationForm }
