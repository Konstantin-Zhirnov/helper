import React from 'react'
import cn from 'classnames'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { useAppDispatch, useAppSelector, useDebounce } from '../../../../shared'

import { getSearch, setPage, setSearch } from '../../model/slice'

import classes from './Search.module.sass'


interface IProps {
  isMobile?: boolean
}

const Search: React.FC<IProps> = React.memo(({ isMobile }) => {

  const dispatch = useAppDispatch()
  const search = useAppSelector(getSearch)

  const [value, setValue] = React.useState('')
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  React.useEffect(() => {
    if (value) {
      if (search !== debouncedValue) {
        dispatch(setPage(1))
        dispatch(setSearch(debouncedValue))
      }
    } else {
      dispatch(setPage(1))
      dispatch(setSearch(value))
    }
  }, [debouncedValue, value])

  const handleClick = () => {
    setValue('')
  }


  return (
    <InputGroup className={cn(classes.input_group, { [`${classes.mobile}`]: isMobile })}>
      <Input
        size='sm'
        value={value}
        onChange={handleChange}
        placeholder='Search...'
        className={classes.input}
      />
      <InputRightElement className={classes.input_right_el}>
        <Button size='sm' onClick={handleClick} aria-label='button clear search'>
          <MdClose />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
})

export { Search }