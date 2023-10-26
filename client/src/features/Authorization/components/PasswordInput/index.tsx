import React from 'react'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import classes from './PasswordInput.module.sass'

interface IProps {
  register: any
}

const PasswordInput: React.FC<IProps> = ({ register }) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="sm">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        id="password"
        autoComplete="off"
        {...register('password')}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.6rem" size="sm" onClick={handleClick} className={classes.btn}>
          {show ? <MdVisibilityOff /> : <MdVisibility />}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export { PasswordInput }
