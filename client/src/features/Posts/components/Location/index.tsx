import React from 'react'

import {Select, useAppDispatch, useAppSelector} from '../../../../shared'

import {getLocation, getLocations, setLocation} from "../../model/slice";


const Location: React.FC = React.memo(() => {

  const dispatch = useAppDispatch()
  const locations = useAppSelector(getLocations)
  const location = useAppSelector(getLocation)

  const handleChange = (value) => {
    localStorage.setItem('location', value)
    dispatch(setLocation(value))
  }

  if (!locations.length) return null

  return (
      <Select options={locations} defaultValue={location} cb={handleChange}/>
  )
})

export { Location }




