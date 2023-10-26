import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../../../widgets'
import { Loader } from '../../../shared'

const Layout = () => {

  return (
    <>
      {false && <Loader />}

      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  )
}

export default Layout
