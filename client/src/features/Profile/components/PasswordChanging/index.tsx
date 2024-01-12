import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'

import {FormButton, FormItem, useAppDispatch, PasswordType} from '../../../../shared'

import {fetchChangePassword, fetchNewPassword} from '../../model/asyncActions'

import classes from './PasswordChanging.module.sass'
import cn from "classnames";


interface IProps {
  _id?: string
  link?: string
}

const PasswordChanging: React.FC<IProps> = React.memo(({ _id, link }) => {
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
      if (link) {
          await dispatch(
              fetchChangePassword({
                  password: data.password,
                  link,
              }),
          )
      }
      if (_id) {
          await dispatch(
              fetchNewPassword({
                  password: data.password,
                  _id,
              }),
          )
      }
    reset()
  }



    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn(classes.container, {[classes.profile]: _id})}>
          <FormItem register={register} errors={errors} name="password" label="New password" />

          <FormItem register={register} errors={errors} name="passwordConfirmation" label="Confirmation password" />

          <FormButton />
      </form>

    )
})

export { PasswordChanging }