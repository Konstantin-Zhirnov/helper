import React from 'react'
import { setLocation } from '../../../features'
import { useAppDispatch } from '../../../shared'

const useLocalStorageLocation = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const location = localStorage.getItem('location')
    if (location) {
      dispatch(setLocation(location))
    } else {
      localStorage.setItem('location', 'Nanaimo')
      dispatch(setLocation('Nanaimo'))
    }
  }, [])
}

export { useLocalStorageLocation }