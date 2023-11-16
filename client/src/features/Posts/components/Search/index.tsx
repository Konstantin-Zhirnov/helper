import React from 'react'
import cn from 'classnames'
import { Input } from '@chakra-ui/react'

import { useDebounce } from '../../../../shared'

import { getSearch, setPage, setSearch } from '../../model/slice'
import { useAppDispatch, useAppSelector } from '../../../../app'

import classes from './Search.module.sass'


interface IProps {
  isMobile?: boolean
}

const Search: React.FC<IProps> = ({ isMobile }) => {

  const dispatch = useAppDispatch()
  const search = useAppSelector(getSearch)

  const [value, setValue] = React.useState('')
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  React.useEffect(() => {
    if (search !== debouncedValue) {
      dispatch(setPage(1))
      dispatch(setSearch(debouncedValue))
    }
  }, [debouncedValue])


  return (
    <Input
      size='sm'
      value={value}
      onChange={handleChange}
      placeholder='Search...'
      className={cn(classes.input, { [`${classes.mobile}`]: isMobile })}
      autoFocus
    />
  )
}

export { Search }