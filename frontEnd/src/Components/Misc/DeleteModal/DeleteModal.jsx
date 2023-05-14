import React from 'react';
import { Button, Popconfirm } from 'antd';
import './DeleteModal.scss'
import {AiFillDelete} from 'react-icons/ai'
function DeleteModal() {
  return (
    <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    okText="Yes"
    cancelText="No"
    onConfirm={()=>{
    }}
  >
      <AiFillDelete color='red' fontSize={'20px'}/>
  </Popconfirm>
  )
}

export default DeleteModal