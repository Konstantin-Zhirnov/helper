import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@chakra-ui/react'
import * as yup from 'yup'

import { useAppDispatch } from '../../../../app'
import { fetchSendEmail } from '../../model/asyncActions'
import { EmailType, SendEmailReasonType } from '../../types'

import classes from './SendToEmail.module.sass'


interface IProps {
  sendEmailReason: SendEmailReasonType
}

const SendToEmail: React.FC<IProps> = ({sendEmailReason}) => {

  const dispatch = useAppDispatch()

  const [seconds, setSeconds] = React.useState(0)

  const schema = yup
    .object()
    .shape({
      email: yup.string().email().required()
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<EmailType>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<EmailType> = async (data) => {
    await dispatch(
      fetchSendEmail({
        email: data.email.toLowerCase(),
        reason: sendEmailReason
      }),
    )
    reset()

    setSeconds(30)
  }

  React.useEffect(() => {
    let timer
    if (seconds > 0) {
      timer = setTimeout(setSeconds, 1000, seconds - 1);
    } else if (timer) {
      clearTimeout(timer)
    }

    return () => clearTimeout(timer)
  }, [ seconds ]);

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

        <button type="submit" className={classes.btn} disabled={Boolean(seconds)}>
          { seconds || "Submit" }
        </button>
      </form>
  )
}

export { SendToEmail }




