import React from 'react'
import cn from 'classnames'
import { ErrorMessage } from '@hookform/error-message'

import { PasswordInput } from '../PasswordInput'

import classes from './FormItem.module.sass'

interface IProps {
  register: any
  errors: any
  name: string
  label: string
}

const FormItem: React.FC<IProps> = ({ register, name, errors, label }) => {
  const getInput = () => {
    switch (label) {
      case 'Password:':
        return <PasswordInput register={register} />
      case 'Description:':
        return (
          <textarea
            id={name}
            {...register(name)}
            autoComplete="off"
            className={cn(classes.input, classes.description)}
          />
        )
      default:
        return <input id={name} {...register(name)} autoComplete="off" className={classes.input} />
    }
  }

  return (
    <div className={classes.input_container}>
      <label htmlFor={name} className={classes.input_label}>
        {label}
      </label>

      {getInput()}

      <ErrorMessage
        errors={errors as any}
        name={name}
        render={({ message }) => <p className={classes.error}>{message}</p>}
      />
    </div>
  )
}

export { FormItem }
