import React from 'react'
import cn from 'classnames'
import { ButtonGroup, IconButton, Input, Text, Textarea } from '@chakra-ui/react'
import { MdClear, MdCreate, MdDone } from 'react-icons/md'
import { BsGeoAltFill } from 'react-icons/bs'


import { useAppDispatch } from '../../../../../shared'
import { fetchUpdatePost } from '../../../model/asyncActions'

import 'react-international-phone/style.css'
import classes from './EditableInput.module.sass'


interface IProps {
  _id: string
  defaultValue: string
  field: string
}

const EditableInput: React.FC<IProps> = ({ _id, defaultValue, field }) => {

  const dispatch = useAppDispatch()
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
    const body = {
      _id,
      field: { [`${field}`]: value },
    }
    dispatch(fetchUpdatePost(body))
    setIsEdit(false)
  }

  const getInput = () => {
    return (
      <div className={classes.inputContainer}>

        {
          field === 'description'
            ? <Textarea onChange={handleChange} value={value} autoFocus />
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
      <div className={cn(classes.textContainer, { [`${classes.textContainer_location}`]: field === 'location' })}>
        {
          field === 'title' && <Text fontSize='lg' className={classes.title}>{value}</Text>
        }
        {
          field === 'description' && <Text fontSize='md'>{value}</Text>
        }
        {
          field === 'location' && <Text className={classes.location}><BsGeoAltFill />{value}</Text>
        }

        <IconButton size='sm' icon={<MdCreate />} onClick={open} aria-label='button create' className={classes.blue} />
      </div>
    )
  }

  return isEdit ? getInput() : getText()
}

export { EditableInput }