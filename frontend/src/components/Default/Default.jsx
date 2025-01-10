import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Default = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Default
