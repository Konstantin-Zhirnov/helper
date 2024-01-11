import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'


import { App } from './app'
import { store } from './shared'

import './index.sass'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
      <App />
    <ToastContainer />
  </Provider>,
)
