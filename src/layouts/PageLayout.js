import React, { Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = lazy(() => import('components/Header'))
const Footer = lazy(() => import('components/Footer'))
const Page = lazy(() => import('components/Page'))

const PageLayout = () => {
  let { pagePath } = useParams()

  return(
    <Suspense fallback={<div />}>
      <Header />
      <main>
        <Page pagePath={pagePath} />
      </main>
      <Footer />
    </Suspense>
  )
}

PageLayout.propTypes = {
  pagePath: PropTypes.string
}

export default PageLayout
