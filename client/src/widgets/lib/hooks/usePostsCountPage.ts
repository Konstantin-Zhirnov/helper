import React from 'react'

import { getPage, getPages, setPage } from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../shared'

export const usePostsCountPage = (inView: boolean) => {
  const dispatch = useAppDispatch()
  const page = useAppSelector(getPage)
  const pages = useAppSelector(getPages)

  React.useEffect(() => {
    if (inView) {
      if (pages > page) {
        dispatch(setPage(page + 1))
      }
    }
  }, [inView])
}
