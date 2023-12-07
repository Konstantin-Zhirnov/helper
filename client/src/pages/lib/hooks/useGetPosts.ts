import React from 'react'

import { fetchPosts, getLocation, getPage, getSearch } from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../shared'

const useGetPosts = () => {
  const dispatch = useAppDispatch()

  const page = useAppSelector(getPage)
  const search = useAppSelector(getSearch)
  const location = useAppSelector(getLocation)


  React.useEffect(() => {
    if (location) {
      dispatch(fetchPosts({ page, search, location }))
    }
  }, [page, search, location])
}

export { useGetPosts }