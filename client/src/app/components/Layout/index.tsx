import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer, Header } from '../../../widgets'
import { Locations, getPostsModal } from '../../../features'
import { useAppSelector } from '../../../shared'

const Layout = () => {
  const isModal = useAppSelector(getPostsModal)
  return (
    <>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />

      {isModal === 'locations' && <Locations />}
      {isModal === 'locations-search' && <Locations search />}
    </>
  )
}

export default Layout
