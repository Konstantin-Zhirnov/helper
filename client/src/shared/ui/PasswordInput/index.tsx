import React from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import classes from './PasswordInput.module.sass'

interface IProps {
  register: any
}

const PasswordInput: React.FC<IProps> = ({ register }) => {
  const [show, setShow] = React.useState(false)

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <div className={classes.container}>
      <input
        type={show ? 'text' : 'password'}
        id="password"
        autoComplete="off"
        {...register('password')}
        className={classes.input}
      />
      <button
        onClick={handleClick}
        className={classes.btn}
        type="button"
        aria-label="button show or hide"
      >
        {show ? <MdVisibilityOff /> : <MdVisibility />}
      </button>
    </div>
  )
}

export { PasswordInput }
