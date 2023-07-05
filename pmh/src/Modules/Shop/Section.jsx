import React from 'react'
import SectionAutoCompleate from '../../Components/AutoCompleat/SectionAutoCompleate'

function Section() {
  return (
    <div className='col-md-12'> 
      <h2 className='page_header'>Sections</h2>
      <div className=" col-md-12 mt-5">
          <h5>Search Section</h5>
      </div>
      <div className="row col-md-12" >
        <div className="col-md-10" >
            <div className="col-md-3">
                <SectionAutoCompleate/>
            </div>
        </div>
        <div className="col-md-2">
          
        </div>
      </div>
      <table className="table table-bordered mt-4">
      <thead >
          <tr className='thead-light'>
            <th>Name</th>
            <th>Code</th> 
            <th>Number of Racks</th>
            <th>Total Investment</th>
          </tr>
      </thead>
      <tbody>
        <tr >
          <td>a</td>
          <td>a</td>
          <td>a</td>
        </tr>
      </tbody>
</table>
    </div>
  )
}

export default Section