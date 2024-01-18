import React from 'react'
import cn from 'classnames'
import { ImSpinner9 } from "react-icons/im"

import classes from './SubmitWithImagesButton.module.sass'



interface IProps {
  currentImagesLength: number
  imagesLength: number
  disabled: boolean
}

const SubmitWithImagesButton: React.FC<IProps> = React.memo(({ currentImagesLength, imagesLength, disabled }) => {

  return (
            <button
                type='submit'
                className={cn(classes.btn, { [classes.disabled]: currentImagesLength !== imagesLength })}
            >
                { disabled ? <ImSpinner9/> : 'Submit' }
            </button>
  )
})

export { SubmitWithImagesButton }