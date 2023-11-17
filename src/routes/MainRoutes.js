import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
const PageLayout = lazy(() => import('layouts/PageLayout'))
const PageNotFoundLayout= lazy(() => import ('layouts/PageNotFoundLayout'))

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/404' element={<PageNotFoundLayout />} />
      <Route exact path=':pagePath?' element={ <PageLayout /> } />
      <Route path='*' element={ <Navigate to='/404' />} />
    </Routes>
  )
}

export default MainRoutes
