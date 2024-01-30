import React from 'react'
import cn from 'classnames'
import { PhoneInput } from 'react-international-phone'
import { FaSquareWhatsapp, FaTelegram } from 'react-icons/fa6'

import { categories, Select } from '../../shared'

import 'react-international-phone/style.css'
import classes from './EditableInput.module.sass'

interface IProps {
  defaultValue: string
  cb?: (value: unknown) => void
  label?: string
}

const EditableInput: React.FC<IProps> = React.memo(({ defaultValue, cb, label }) => {
  const [value, setValue] = React.useState(defaultValue || 'No information available')
  const [isEdit, setIsEdit] = React.useState(false)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleSave = () => {
    cb(value.trim())
    setIsEdit(false)
  }

  const getIcon = () => {
    if (label === 'WhatsApp') return <FaSquareWhatsapp className={classes.whatsapp} />
    if (label === 'Telegram') return <FaTelegram className={classes.telegram} />
    return ''
  }

  const getButton = () => {
    if (isEdit) {
      return (
        <button className={cn(classes.btn, classes.red)} onClick={handleSave}>
          Save
        </button>
      )
    } else {
      if (label !== 'Email:') {
        return (
          <button className={classes.btn} onClick={handleEdit}>
            Edit
          </button>
        )
      } else {
        return null
      }
    }
  }

  const getInput = () => {
    switch (label) {
      case 'Phone:':
        return (
          <PhoneInput
            defaultCountry="ca"
            value={value}
            onChange={(phone) => setValue(phone)}
            autoFocus
            disabled={!isEdit}
          />
        )
      case 'Description:':
        return (
          <textarea
            onChange={handleChange}
            value={value}
            autoComplete="off"
            autoFocus
            disabled={!isEdit}
            className={classes.textarea}
          />
        )
      case 'Category:':
        return !isEdit ? (
          <input value={value} disabled className={classes.input} />
        ) : (
          <Select options={categories} defaultValue={value} cb={setValue} category />
        )
      default:
        return (
          <input
            onChange={handleChange}
            value={value}
            autoComplete="off"
            autoFocus
            disabled={(!isEdit && label !== 'Email') || label === 'Email'}
            className={classes.input}
          />
        )
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.text_container}>
        <p className={classes.text}>
          {getIcon()}
          {label}
        </p>
        {getButton()}
      </div>

      {getInput()}
    </div>
  )
})

export { EditableInput }
