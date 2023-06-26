import React from 'react'
import './Sidebar.scss'
import {AiOutlineHome} from 'react-icons/ai'
function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-item"><h6><span><AiOutlineHome/></span> Home</h6></div>
    </div>
  )
}

export default Sidebar