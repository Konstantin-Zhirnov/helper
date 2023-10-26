import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@chakra-ui/react'
import cn from 'classnames'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../../../../app'
import { fetchLogin } from '../../../../model/asyncActions'
import { getLoginErrorMessage, goToSendEmailPage } from '../../../../model/slice'
import { LoginType, SendEmailReasonType } from '../../../../types'

import { PasswordInput } from '../../../PasswordInput'

import classes from './LoginForm.module.sass'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const loginErrorMessage = useAppSelector(getLoginErrorMessage)

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<LoginType>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    await dispatch(
      fetchLogin({
        email: data.email.toLowerCase(),
        password: data.password,
      }),
    )
    reset()
  }

  const handleClick = (key: SendEmailReasonType) => () => {
    dispatch(goToSendEmailPage(key))
  }

  const getLink = () => {
    if (loginErrorMessage === "You need to confirm your email") {
      return <NavLink to="/send-email" className={classes.link} onClick={handleClick('activation')}>activation link</NavLink>
    }
    return ""
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <span className={classes.input_container}>
        <label htmlFor="email">Email:</label>
        <Input id="email" size="sm" {...register('email')} autoComplete="off" />
        <ErrorMessage
          errors={errors as any}
          name="email"
          render={({ message }) => <p className={classes.error}>{message}</p>}
        />
      </span>

      <span className={classes.input_container}>
        <label htmlFor="password">Password:</label>
        <PasswordInput register={register} />

        <ErrorMessage
          errors={errors as any}
          name="password"
          render={({ message }) => <p className={classes.error}>{message}</p>}
        />
      </span>

      <NavLink to='/send-email' onClick={handleClick('password')} className={cn(classes.link, classes.mb05)}>Forgot password?</NavLink>

      <p>If you are not registered, then you can register by clicking on the link:&nbsp;&nbsp;<NavLink to='/registration' onClick={handleClick("")} className={classes.link}>registration</NavLink></p>

      <p className={cn(classes.serverError, { [`${classes.visible}`]: loginErrorMessage, [`${classes.hidden}`]: !loginErrorMessage })}>
        {loginErrorMessage} <span>&nbsp;&nbsp;</span> {getLink()}
      </p>

      <Button type="submit" className={classes.btn}>
        Submit
      </Button>
    </form>
  )
}

export { LoginForm }
