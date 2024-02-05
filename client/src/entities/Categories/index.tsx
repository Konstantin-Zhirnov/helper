import React from 'react'

import { categories, Select } from '../../shared'

import classes from './Categories.module.sass'

interface IProps {
  label: string
  cb: (value: string) => void
}

const Categories: React.FC<IProps> = React.memo(({ label, cb }) => {
  return (
    <div className={classes.container}>
      <div className={classes.text_container}>
        <p className={classes.text}>{label}</p>
      </div>

      <Select options={categories} defaultValue={categories[0]} cb={cb} category />
    </div>
  )
})

export { Categories }
