import React from 'react'
import Horizontal from "../BarComponents/HorizontalBar/HorizontalBar"
import Vertical from "../BarComponents/VerticalBar/VerticalBar"
import { Outlet } from 'react-router-dom'
import "./Layout.css"

const Layout = () => {
  return (
    <div className='layout-container'>
    <Horizontal />
    <div className="layout-body">
        <Vertical />
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout