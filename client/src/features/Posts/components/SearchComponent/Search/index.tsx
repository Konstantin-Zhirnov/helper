import React from 'react'
import cn from 'classnames'
import { MdSearch } from 'react-icons/md'

import { useAppDispatch, useAppSelector } from '../../../../../shared'

import {getSearchComponentSearch, setSearchComponentSearch} from "../../../model/slice";

import classes from './Search.module.sass'



interface IProps {
  isMobile?: boolean
}

const Search: React.FC<IProps> = React.memo(({ isMobile }) => {

  const dispatch = useAppDispatch()
  const searchComponentSearch = useAppSelector(getSearchComponentSearch)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchComponentSearch(event.target.value))
  }

  return (
        <div className={cn(classes.input_group, { [classes.mobile]: isMobile })}>
          <MdSearch size={20}/>
          <input
              value={searchComponentSearch}
              onChange={handleChange}
              placeholder='Dog walking, house cleaning...'
              className={classes.input}
          />
        </div>
  )
})

export { Search }