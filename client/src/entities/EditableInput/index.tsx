import React from 'react'
import { ButtonGroup, IconButton, Input } from '@chakra-ui/react'
import { MdClear, MdCreate, MdDone } from 'react-icons/md'
import { PhoneInput } from 'react-international-phone'

import 'react-international-phone/style.css'
import classes from './EditableInput.module.sass'


interface IProps {
  defaultValue: string
  cb: (value: unknown) => void
  isPhone?: boolean
}

const EditableInput: React.FC<IProps> = React.memo(({ defaultValue, cb, isPhone }) => {

  const [value, setValue] = React.useState(defaultValue)
  const [isEdit, setIsEdit] = React.useState(false)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const open = () => {
    setIsEdit(true)
  }

  const close = () => {
    setValue(defaultValue)
    setIsEdit(false)
  }

  const handleDoneClick = () => {
    cb(value)
    setIsEdit(false)
  }

  const getInput = () => {
    return (
      <div className={classes.inputContainer}>
        {
          isPhone
            ? <PhoneInput
              defaultCountry='ca'
              value={value}
              onChange={(phone) => setValue(phone)}
              autoFocus
            />
            : <Input onChange={handleChange} size='sm' value={value} autoComplete='off' autoFocus />
        }


        <ButtonGroup justifyContent='center' size='sm'>
          <IconButton size='sm' icon={<MdDone />} onClick={handleDoneClick} aria-label='button done'
                      className={classes.blue} />
          <IconButton size='sm' icon={<MdClear />} onClick={close} aria-label='button close' className={classes.red} />
        </ButtonGroup>
      </div>
    )
  }

  const getText = () => {
    return (
      <div className={classes.textContainer}>
        <p>{value || 'No information available'}</p>
        <IconButton size='sm' icon={<MdCreate />} onClick={open} aria-label='button create' className={classes.blue} />
      </div>
    )
  }

  return isEdit ? getInput() : getText()
})

export { EditableInput }