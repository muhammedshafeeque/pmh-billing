import React from 'react'
import Header from '../../Components/Header/Header'
import { Row } from 'react-bootstrap'
import Sidebar from '../../Components/SideBar/Sidebar'

function Home() {
  return (
    <div>
      <Header/>
      <Row className='col-md-12'>
        <div className="col-md-2">
        <Sidebar/>
        </div>
        
        <div className="dol-md-10">

        </div>

      </Row>
    </div>
  )
}

export default Home