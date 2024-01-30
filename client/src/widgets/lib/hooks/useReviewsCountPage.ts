import React from 'react'

import { getReviewsPage, getReviewsPages, setReviewsPage } from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../shared'

export const useReviewsCountPage = (inView: boolean) => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(getReviewsPage)
  const pages = useAppSelector(getReviewsPages)

  React.useEffect(() => {
    if (inView) {
      if (pages > page) {
        dispatch(setReviewsPage(page + 1))
      }
    }
  }, [inView])
}
