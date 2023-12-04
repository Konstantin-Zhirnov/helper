import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@chakra-ui/react'
import * as yup from 'yup'

import type { PasswordType } from '../../../../shared'
import { useAppDispatch } from '../../../../shared'

import { fetchChangePassword } from '../../model/asyncActions'

import classes from './PasswordChanging.module.sass'


interface IProps {
  link: string
}


const PasswordChanging: React.FC<IProps> = React.memo(({ link }) => {

  const dispatch = useAppDispatch()

  const schema = yup
    .object()
    .shape({
      password: yup.string().required('Password is required'),
      passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    .required()


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PasswordType>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<PasswordType> = async (data) => {
    await dispatch(
      fetchChangePassword({
        password: data.password,
        link,
      }),
    )
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
          <span className={classes.input_container}>
              <label htmlFor='password'>New password:</label>
              <Input id='password' size='sm' {...register('password')} autoComplete='off' />
              <ErrorMessage
                errors={errors as any}
                name='password'
                render={({ message }) => <p className={classes.error}>{message}</p>}
              />
          </span>

      <span className={classes.input_container}>
              <label htmlFor='passwordConfirmation'>Confirmation password:</label>
              <Input id='passwordConfirmation' size='sm' {...register('passwordConfirmation')} autoComplete='off' />
              <ErrorMessage
                errors={errors as any}
                name='passwordConfirmation'
                render={({ message }) => <p className={classes.error}>{message}</p>}
              />
          </span>

      <button type='submit' className={classes.btn}>Submit</button>
    </form>
  )
})

export { PasswordChanging }




