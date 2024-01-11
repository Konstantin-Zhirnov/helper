import React from 'react'

import classes from './FormButton.module.sass'


const FormButton: React.FC = () => {
  return (
      <button type='submit' className={classes.btn}>
        Submit
      </button>
  )
}

export { FormButton }
