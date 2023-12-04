import React from 'react'

import {
  fetchPosts,
  fetchPostsByUser, getIsNewAvatar, getLocation,
  getPage,
  getSearch, getUserId,
  setIsNewAvatar,
} from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../shared'

const useNewAvatar = () => {
  const dispatch = useAppDispatch()

  const page = useAppSelector(getPage)
  const search = useAppSelector(getSearch)
  const location = useAppSelector(getLocation)
  const isNewAvatar = useAppSelector(getIsNewAvatar)
  const userId = useAppSelector(getUserId)

  React.useEffect(() => {
    if (isNewAvatar) {
      dispatch(fetchPosts({ page, search, location }))
      dispatch(fetchPostsByUser(userId))
      dispatch(setIsNewAvatar(false))
    }
  }, [page, search, location, isNewAvatar])
}

export { useNewAvatar }