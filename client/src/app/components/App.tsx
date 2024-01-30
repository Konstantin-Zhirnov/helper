import React, { lazy } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import Layout from './Layout'

const PostsPage = lazy(() => import('../../pages/PostsPage'))
const ConfirmationPage = lazy(() => import('../../pages/ConfirmationPage'))
const SendEmailPage = lazy(() => import('../../pages/SendEmailPage'))
const PasswordPage = lazy(() => import('../../pages/PasswordPage'))
const ProfilePage = lazy(() => import('../../pages/ProfilePage'))
const ReviewsPage = lazy(() => import('../../pages/ReviewsPage'))
const PaymentPage = lazy(() => import('../../pages/PaymentPage'))
const PolicyPage = lazy(() => import('../../pages/PolicyPage'))

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsPage />} />
        <Route path="/confirmation/:link" element={<ConfirmationPage />} />
        <Route path="/password/:link" element={<PasswordPage />} />
        <Route path="/send-email" element={<SendEmailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reviews/:id" element={<ReviewsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/policy" element={<PolicyPage />} />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}

export default App
