import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer, Header } from '../../../widgets'

const Layout = () => {

  return (
    <>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}

export default Layout
