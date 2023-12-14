import React from 'react'

import {
  fetchPostsByUser,
  fetchReviewsByAuthor,
  getIsReload,
  getUserId,
  setIsReload,
} from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../shared'

const useReload = () => {
  const dispatch = useAppDispatch()

  const isReload = useAppSelector(getIsReload)
  const userId = useAppSelector(getUserId)

  React.useEffect(() => {
    if (isReload) {
      dispatch(fetchPostsByUser(userId))
      dispatch(fetchReviewsByAuthor(userId))
      dispatch(setIsReload(false))
    }
  }, [isReload])
}

export { useReload }