import React from 'react'
import cn from 'classnames'
import { MdSearch } from 'react-icons/md'

import { useAppDispatch, useAppSelector, useDebounce } from '../../../../shared'

import {getMainSearch, getSearch, setMainSearch, setPage, setSearch} from '../../model/slice'

import classes from './Search.module.sass'


interface IProps {
  isMobile?: boolean
}

const Search: React.FC<IProps> = React.memo(({ isMobile }) => {

  const dispatch = useAppDispatch()
  const search = useAppSelector(getSearch)
  const isMainSearch = useAppSelector(getMainSearch)

  const [value, setValue] = React.useState(search)
  const debouncedValue = useDebounce(value, !isMainSearch ? 500 : 0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  React.useEffect(() => {
    if (!isMainSearch) {
      if (value) {
        if (search !== debouncedValue) {
          dispatch(setPage(1))
          dispatch(setSearch(debouncedValue))
        }
      } else {
        dispatch(setPage(1))
        dispatch(setSearch(value))
      }
    }
  }, [debouncedValue, value])

  React.useEffect(() => {
  if(isMainSearch) {
      if (search !== value) {
          setValue(search)
      } else if (value === debouncedValue) {
        dispatch(setMainSearch(false))
      }
    }
  }, [search, value, debouncedValue])


  return (
      <>
        <div className={cn(classes.input_group, { [classes.mobile]: isMobile })}>
          <MdSearch />
          <input
              value={value}
              onChange={handleChange}
              placeholder='Search...'
              className={classes.input}
          />
        </div>
        <div className={classes.divider}/>
      </>
  )
})

export { Search }