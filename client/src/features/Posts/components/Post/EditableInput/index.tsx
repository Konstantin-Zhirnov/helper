import React from 'react'
import cn from 'classnames'
import { MdClear, MdCreate, MdDone } from 'react-icons/md'

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
            ? <textarea onChange={handleChange} value={value} autoFocus />
            : <input onChange={handleChange} value={value} autoComplete='off' autoFocus />
        }

        <div>
          <button onClick={handleDoneClick} aria-label='button done'
                  className={classes.blue} ><MdDone /></button>
          <button onClick={close} aria-label='button close' className={classes.red} ><MdClear /></button>
        </div>
      </div>
    )
  }

  const getText = () => {
    return (
      <div className={cn(classes.textContainer, { [classes.textContainer_location]: field === 'location' })}>
        {
          field === 'title' && <p className={classes.title}>{value}</p>
        }
        {
          field === 'description' && <p>{value}</p>
        }
        {
          field === 'location' && <p className={classes.location}>{value}</p>
        }

        <button onClick={open} aria-label='button create' className={classes.blue} ><MdCreate /></button>
      </div>
    )
  }

  return isEdit ? getInput() : getText()
}

export { EditableInput }