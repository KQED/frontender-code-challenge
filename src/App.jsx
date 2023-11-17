import React, { Suspense, lazy } from 'react'
const MainRoutes = lazy(() => import('./routes/MainRoutes'))

function App () {
  return (
    <div className='App'>
      <Suspense fallback={<div />}>
        <MainRoutes />
      </Suspense>
    </div>
  )
}

export default App
