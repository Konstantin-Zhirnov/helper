import React from 'react'
import { Select } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../../../../app'
import { getLocations, setLocation } from '../../../model/slice'

import classes from './LocationSelect.module.sass'


const LocationSelect: React.FC = () => {

  const dispatch = useAppDispatch()
  const locations = useAppSelector(getLocations)

  const location = localStorage.getItem('location')

  const handleChange = (e) => {
    localStorage.setItem('location', e.target.value)
    dispatch(setLocation(e.target.value))
  }

  if (!locations.length) return null

  return (
    <Select onChange={handleChange} className={classes.select} size='sm' value={location}>
      {
        locations.map(location => <option key={location} value={location}>{location}</option>)
      }
    </Select>
  )
}

export { LocationSelect }




