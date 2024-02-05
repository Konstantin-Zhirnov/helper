import React from 'react'
import cn from 'classnames'
import { ImSpinner9 } from 'react-icons/im'

import { useAppDispatch, useAppSelector } from '../../../../../shared'

import { getSearchButtonLoading, setDataForSearch } from '../../../model/slice'

import classes from './SearchButton.module.sass'

interface IProps {
  isMobile?: boolean
}

const SearchButton: React.FC<IProps> = React.memo(({ isMobile }) => {
  const dispatch = useAppDispatch()
  const searchButtonLoading = useAppSelector(getSearchButtonLoading)
  const handleClick = () => {
    if (!searchButtonLoading) {
      dispatch(setDataForSearch())
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(classes.btn, {
        [classes.mobile]: isMobile,
        [classes.disabled]: searchButtonLoading,
      })}
    >
      {searchButtonLoading ? <ImSpinner9 /> : 'Search'}
    </button>
  )
})

export { SearchButton }
