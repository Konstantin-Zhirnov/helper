import React from 'react'
import cn from "classnames";
import {ImSpinner9} from "react-icons/im";

import {useAppDispatch, useAppSelector} from '../../../../../shared'

import {getLoading, setDataForSearch} from "../../../model/slice";

import classes from './SearchButton.module.sass'



interface IProps {
  isMobile?: boolean
}

const SearchButton: React.FC<IProps> = React.memo(({ isMobile }) => {

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getLoading)

    const [loader, setLoader] = React.useState(false)

  const handleClick = () => {
      if (!isLoading) {
          dispatch(setDataForSearch())
          setLoader(true)
      }
  }

  React.useEffect(() => {
      if (loader && !isLoading) {
          setLoader(false)
      }
  }, [isLoading])

  return (
      <button
          onClick={handleClick}
          className={cn(classes.btn, {[classes.mobile]: isMobile, [classes.disabled]: isLoading})}
      >
        { loader ? <ImSpinner9/> : 'Search' }
      </button>
  )
})

export { SearchButton }




