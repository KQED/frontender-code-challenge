import React, { Suspense, lazy } from 'react'

const Header = lazy(() => import('components/Header'))
const Footer = lazy(() => import('components/Footer'))
const PageNotFound = lazy(() => import('components/PageNotFound'))

const PageNotFoundLayout = () => {
  return ( 
    <Suspense fallback={<div />}>
      <Header />
      <main>
        <PageNotFound />
      </main>
      <Footer />
    </Suspense>
  )
}

export default PageNotFoundLayout
