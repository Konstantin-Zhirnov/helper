import React from 'react'

import {fetchPosts, getCategory, getLocation, getPage, getSearch} from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../shared'

const useGetPosts = () => {
  const dispatch = useAppDispatch()

  const page = useAppSelector(getPage)
  const search = useAppSelector(getSearch)
  const location = useAppSelector(getLocation)
  const category = useAppSelector(getCategory)

  React.useEffect(() => {
    if (location) {
      dispatch(fetchPosts({ page, search, location, category }))
    }
  }, [page, search, location, category])
}

export { useGetPosts }