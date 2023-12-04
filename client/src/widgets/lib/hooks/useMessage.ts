import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  getAlertAuthorizationMessage,
  getAlertPostsMessage,
  setAlertAuthorizationMessage,
  setAlertPostsMessage,
} from '../../../features'
import { useAppDispatch, useAppSelector } from '../../../shared'

export const useMessage = () => {
  const dispatch = useAppDispatch()

  const authorizationMessage = useAppSelector(getAlertAuthorizationMessage)
  const postsMessage = useAppSelector(getAlertPostsMessage)

  const clear = () => {
    dispatch(setAlertAuthorizationMessage(''))
    dispatch(setAlertPostsMessage(''))
  }

  React.useEffect(() => {
    const message = authorizationMessage || postsMessage
    if (message) {
      toast(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        type: 'error',
      })
      clear()
    }
  }, [authorizationMessage, postsMessage])
}
