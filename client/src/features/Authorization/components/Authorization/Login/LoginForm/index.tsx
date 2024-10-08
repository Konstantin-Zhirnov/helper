import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import * as yup from 'yup'

import {
  FormButton,
  FormItem,
  SmallLink,
  useAppDispatch,
  useAppSelector,
} from '../../../../../../shared'

import { fetchLogin } from '../../../../model/asyncActions'
import {
  getLoginErrorMessage,
  goToSendEmailPage,
  getLoading,
  getMobileMenu,
  setMobileMenu,
} from '../../../../model/slice'
import { LoginType, SendEmailReasonType } from '../../../../types'

import classes from './LoginForm.module.sass'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const loginErrorMessage = useAppSelector(getLoginErrorMessage)
  const isMobileMenu = useAppSelector(getMobileMenu)
  const isLoading = useAppSelector(getLoading)

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
    reset,
  } = useForm<LoginType>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    if (!isLoading) {
      await dispatch(
        fetchLogin({
          email: data.email.trim().toLowerCase(),
          password: data.password.trim(),
        }),
      )
      reset()
    }
  }

  const handleClick = (key: SendEmailReasonType) => () => {
    dispatch(goToSendEmailPage(key))
    document.body.style.overflow = 'auto'
    if (isMobileMenu) {
      dispatch(setMobileMenu(false))
    }
  }

  const getLink = () => {
    if (loginErrorMessage === 'You need to confirm your email') {
      return (
        <NavLink to="/send-email" className={classes.link} onClick={handleClick('activation')}>
          Activation link
        </NavLink>
      )
    }
    return ''
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <FormItem register={register} errors={errors} name="email" label="Email:" />

      <FormItem register={register} errors={errors} name="password" label="Password:" />

      <NavLink
        to="/send-email"
        onClick={handleClick('password')}
        className={cn(classes.link, classes.mb05)}
      >
        Forgot password?
      </NavLink>
      <SmallLink to="/policy" text="Privacy Policy" />

      <p
        className={cn(classes.serverError, {
          [classes.visible]: loginErrorMessage,
          [classes.hidden]: !loginErrorMessage,
        })}
      >
        {loginErrorMessage} <span>&nbsp;&nbsp;</span> {getLink()}
      </p>

      <FormButton disabled={isLoading} />
    </form>
  )
}

export { LoginForm }
