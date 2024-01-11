import React from 'react'
import { ErrorMessage } from '@hookform/error-message'

import {PasswordInput} from "../PasswordInput";

import classes from './FormItem.module.sass'



interface IProps {
    register: any
    errors: any
    name: string
    label: string
    password?: boolean
}

const FormItem: React.FC<IProps> = ({register, name, errors, label, password}) => {

  return (
      <div className={classes.input_container}>
          <label htmlFor={name} className={classes.input_label}>{label}:</label>

          {
            password
                ? <PasswordInput register={register}/>
                : <input id={name} {...register(name)} autoComplete='off' className={classes.input}/>
          }

          <ErrorMessage
            errors={errors as any}
            name={name}
            render={({ message }) => <p className={classes.error}>{message}</p>}
          />
      </div>
  )
}

export { FormItem }
