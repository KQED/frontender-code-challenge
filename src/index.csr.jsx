import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { createStore }from 'slices/store'

const store = createStore()
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(app)
