import { createSlice } from '@reduxjs/toolkit'
import fetch from 'cross-fetch'

export const formatPageData = pageData => {
  Object.assign(pageData, pageData.attributes)
  delete pageData.attributes
  return pageData
}

export const pagesSlice = createSlice({
  name: 'pages',
  initialState: {},
  reducers: {
    receivePages: (state, action) => {
      const page = action.payload
      state[page.pagePath] = {
        ...formatPageData(page.data),
        isLoading: false
      }
    }
  }
})

export const { receivePages } = pagesSlice.actions

export const fetchPage = (pagePath) => {
  return async (dispatch) => {
    const query = 'pages/'+ process.env.__WP_SITE__ +`?path=${pagePath}`
    const url = `${process.env.__MEDIA_API_URL__}${query}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.warn(
          'Page fetch failed',
          JSON.stringify(response, null, 2)
        )
        return null
      }
      const res = await response.json()
      dispatch(receivePages({ pagePath: pagePath, data: res.data[0] }))
      return pagePath
    } catch (error) {
      console.warn(
        'Page fetch failed',
        JSON.stringify(error, null, 2)
      )
      return null
    }
  }
}

export const selectPage = (state, pagePath) => {
  return state.pages[pagePath]
}

export default pagesSlice.reducer
