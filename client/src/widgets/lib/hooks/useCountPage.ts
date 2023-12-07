import React from 'react'
import { useLocation } from 'react-router-dom'

import { getPage, getPages, getReviewsPage, getReviewsPages, setPage, setReviewsPage } from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../shared'


export const useCountPage = (inView) => {

  const { pathname } = useLocation()

  const dispatch = useAppDispatch()
  const postsPage = useAppSelector(getPage)
  const postsPages = useAppSelector(getPages)
  const reviewsPage = useAppSelector(getReviewsPage)
  const reviewsPages = useAppSelector(getReviewsPages)


  React.useEffect(() => {
    if (inView) {
      if (postsPages > postsPage && pathname === '/') {
        dispatch(setPage(postsPage + 1))
      }
      if (reviewsPages > reviewsPage && pathname.includes('/reviews/')) {
        dispatch(setReviewsPage(reviewsPage + 1))
      }
    }
  }, [inView])
}
