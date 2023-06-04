import React, { useEffect, useState } from 'react'
import axios from '../../../Axios/axios'
import { Select } from 'antd';
function RackMultiSelect({section,selectValue}) {
  const { Option } = Select;
    const [racks,setRacks]=useState([])
    function handleChange(value) {
      console.log(value)
        // selectValue(value)
      }
      useEffect(()=>{
        axios.get(`/stock/rack?section=${section?section:''}`).then((res)=>{
            setRacks(res.data)
        })
      },[section])
  return (
  <Select span={24}
    mode="multiple"
    placeholder="select  Racks"
    onChange={handleChange}
    optionLabelProp="label"

  >
    {racks.length&&racks.map((rack)=>{
      return <Option key={rack._id} value={rack.code}>
        {rack.code}
    </Option>
    })}
  </Select>
    
  )
}

export default RackMultiSelect