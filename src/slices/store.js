import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pages'

export const createStore = () => {
  /*
   * If we are in browser mode we can check to see if the server
   * left some prefetched data for us to use
   */
  let initState = {}
  if (typeof window !== 'undefined') {
    if (window.__INITIAL_STATE__) initState = window.__INITIAL_STATE__
  }

  const store = configureStore({
    reducer: {
      pages: pageReducer
    },
    preloadedState: initState
  })

  return store
}
