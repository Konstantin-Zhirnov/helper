import React from 'react'
import cn from "classnames";

import {useAppDispatch} from '../../../../../shared'

import {setDataForSearch} from "../../../model/slice";

import classes from './SearchButton.module.sass'


interface IProps {
  isMobile?: boolean
}

const SearchButton: React.FC<IProps> = React.memo(({ isMobile }) => {

  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setDataForSearch())
  }

  return <button onClick={handleClick} className={cn(classes.btn, {[classes.mobile]: isMobile})}>Search</button>
})

export { SearchButton }




