import React from 'react'
import cn from "classnames";
import { PhoneInput } from 'react-international-phone'
import { FaSquareWhatsapp, FaTelegram } from 'react-icons/fa6'

import 'react-international-phone/style.css'
import classes from './EditableInput.module.sass'




interface IProps {
  defaultValue: string
  cb?: (value: unknown) => void
  label: string
  isPhone?: boolean
}

const EditableInput: React.FC<IProps> = React.memo(({ defaultValue, cb, label, isPhone }) => {

  const [value, setValue] = React.useState(defaultValue || 'No information available')
  const [isEdit, setIsEdit] = React.useState(false)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleSave = () => {
    cb(value)
    setIsEdit(false)
  }

  const getIcon = () => {
    if (label === 'WhatsApp') return <FaSquareWhatsapp className={classes.whatsapp} />
    if (label === 'Telegram') return <FaTelegram className={classes.telegram} />
    return ''
  }

  return (
    <div className={classes.container}>
      <div className={classes.text_container}>
        <p className={classes.text}>
          {getIcon()}
          {label}
        </p>
        {
          isEdit
            ? <button className={cn(classes.btn, classes.red)} onClick={handleSave}>Save</button>
            : label !== 'Email'
              ? <button className={classes.btn} onClick={handleEdit}>Edit</button>
              : null
        }
      </div>
      {
        isPhone
          ? <PhoneInput
            defaultCountry='ca'
            value={value}
            onChange={(phone) => setValue(phone)}
            autoFocus
            disabled={!isEdit}
          />
          : <input
                onChange={handleChange}
                value={value}
                autoComplete='off'
                autoFocus
                disabled={(!isEdit && label !== 'Email') || label === 'Email'}
                className={classes.input}
            />
      }
    </div>
    )
})

export { EditableInput }