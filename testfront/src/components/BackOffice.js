import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Controller from "./ControlSidebar"

function BackOffice(props) {

  return (
    <>
    <div className='wrapper'>
        <Navbar />
        <Sidebar />
        <div className='content-wrapper p-2'>
            {props.children}
        </div>
        <Footer />
        <Controller />
    </div>
    </>
  )
}

export default BackOffice