import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'

import { App, store } from './app'

import './index.sass'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    <ToastContainer />
  </Provider>,
)
