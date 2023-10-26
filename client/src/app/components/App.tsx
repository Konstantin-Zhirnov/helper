import React, { lazy } from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

import Layout from './Layout'

const PostsPage = lazy(() => import('../../pages/PostsPage'))
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage'))
const ConfirmationPage = lazy(() => import('../../pages/ConfirmationPage'))
const SendEmailPage = lazy(() => import('../../pages/SendEmailPage'))
const PasswordPage = lazy(() => import('../../pages/PasswordPage'))
const ProfilePage = lazy(() => import('../../pages/ProfilePage'))



const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/confirmation/:link" element={<ConfirmationPage />} />
        <Route path="/password/:link" element={<PasswordPage />} />
        <Route path="/send-email" element={<SendEmailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}

export default App
