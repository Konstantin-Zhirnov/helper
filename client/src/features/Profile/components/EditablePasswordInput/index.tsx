import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdClear, MdCreate, MdDone } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { ErrorMessage } from '@hookform/error-message'
import { ButtonGroup, IconButton, Input, Text } from '@chakra-ui/react'
import * as yup from 'yup'

import { useAppDispatch } from '../../../../app'
import { PasswordType } from '../../../Authorization/types'

import { fetchNewPassword } from '../../../Authorization/model/asyncActions'

import classes from './EditablePasswordInput.module.sass'

interface IProps {
  _id: string
}

const EditablePasswordInput: React.FC<IProps> = React.memo(({ _id }) => {
  const dispatch = useAppDispatch()

  const [isEdit, setIsEdit] = React.useState(false)

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
      fetchNewPassword({
        _id,
        password: data.password,
      }),
    )
    reset()
    setIsEdit(false)
  }

  const open = () => {
    setIsEdit(true)
  }

  const close = async () => {
    await reset()
    setIsEdit(false)
  }

  const getInput = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={classes.inputContainer}>
        <span className={classes.input_container}>
            <label htmlFor='password'>New password:</label>
            <Input id='password' size='sm' {...register('password')} autoComplete='off' autoFocus />
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

        <ButtonGroup justifyContent='center' size='sm'>
          <IconButton type='submit' size='sm' icon={<MdDone />} aria-label='button done' className={classes.blue} />
          <IconButton size='sm' icon={<MdClear />} onClick={close} aria-label='button close' className={classes.red} />
        </ButtonGroup>
      </form>

    )
  }

  const getText = () => {
    return (
      <div className={classes.textContainer}>
        <Text fontSize='lg'>******</Text>
        <IconButton size='sm' icon={<MdCreate />} onClick={open} aria-label='button create' className={classes.blue} />
      </div>
    )
  }

  return isEdit ? getInput() : getText()
})

export { EditablePasswordInput }