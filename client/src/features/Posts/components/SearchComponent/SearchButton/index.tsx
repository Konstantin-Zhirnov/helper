import React from 'react'
import cn from "classnames";

import {useAppDispatch, useAppSelector} from '../../../../../shared'

import {getLoading, setDataForSearch} from "../../../model/slice";

import classes from './SearchButton.module.sass'
import {ImSpinner9} from "react-icons/im";


interface IProps {
  isMobile?: boolean
  disabled?: boolean
}

const SearchButton: React.FC<IProps> = React.memo(({ isMobile, disabled }) => {

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getLoading)

  const handleClick = () => {
      if (!isLoading) {
          dispatch(setDataForSearch())
      }
  }

  return (
      <button
          onClick={handleClick}
          className={cn(classes.btn, {[classes.mobile]: isMobile, [classes.disabled]: isLoading})}
      >
        { isLoading ? <ImSpinner9/> : 'Submit' }
      </button>
  )
})

export { SearchButton }




