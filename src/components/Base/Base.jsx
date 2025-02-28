import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './Base.css'

export const Base = ({ children }) => {
  return (
    <div>
        <Navbar />
        <div className='base-child'>
        { children }
        </div>
        <Footer />
    </div>
  )
}

export default Base;
