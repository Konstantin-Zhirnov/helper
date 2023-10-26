import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useAppDispatch } from '../../../app'
import { setAlertMessage } from '../../../features'


export const useMessage = (message) => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
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
      dispatch(setAlertMessage(''))
    }
  }, [message])
}
