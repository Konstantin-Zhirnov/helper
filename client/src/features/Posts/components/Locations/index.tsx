import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import { LocationItem, useAppDispatch, useAppSelector } from '../../../../shared'

import {
  getLocation,
  getLocations,
  setLocation,
  setModal,
  setSearchComponentLocation,
} from '../../model/slice'

import classes from './Locations.module.sass'
import ReactDOM from 'react-dom'

const modalRootElement = document.querySelector('#modal')

interface IProps {
  search?: boolean
}

const Locations: React.FC<IProps> = React.memo(({ search }) => {
  const dispatch = useAppDispatch()
  const locations = useAppSelector(getLocations)
  const location = useAppSelector(getLocation)

  const [inputValue, setInputValue] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClick = React.useCallback(
    (value: string) => {
      if (search) {
        dispatch(setSearchComponentLocation(value))
      } else {
        dispatch(setLocation(value))
        localStorage.setItem('location', value)
      }
      setInputValue('')
      dispatch(setModal(''))
      document.body.style.overflow = 'auto'
    },
    [search],
  )

  return ReactDOM.createPortal(
    <div className={classes.container}>
      <div className={classes.search_container}>
        <AiOutlineSearch size={16} className={classes.search_icon} />
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter location"
          className={classes.input}
        />
      </div>
      <ul className={classes.ul}>
        {locations.map((item) => (
          <LocationItem
            key={item}
            item={item}
            defaultValue={location}
            inputValue={inputValue}
            cb={handleClick}
          />
        ))}
      </ul>
    </div>,
    modalRootElement,
  )
})

export { Locations }
