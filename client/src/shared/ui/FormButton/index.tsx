import React from 'react'
import cn from "classnames";
import { ImSpinner9 } from "react-icons/im"

import classes from './FormButton.module.sass'



interface IProps {
    disabled?: boolean
}

const FormButton: React.FC<IProps> = React.memo(({ disabled }) => {
  return (
      <button type='submit' className={cn(classes.btn, {[classes.disabled]: disabled})}>
          { disabled ? <ImSpinner9/> : 'Submit' }
      </button>
  )
})

export { FormButton }
