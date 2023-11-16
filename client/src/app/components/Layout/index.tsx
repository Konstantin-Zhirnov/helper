import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer, Header } from '../../../widgets'
import { Loader } from '../../../shared'

const Layout = () => {

  return (
    <>
      {false && <Loader />}

      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}

export default Layout
