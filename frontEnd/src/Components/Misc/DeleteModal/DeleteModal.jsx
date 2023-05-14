import React from 'react';
import { Button, Popconfirm } from 'antd';
import './DeleteModal.scss'
import {AiFillDelete} from 'react-icons/ai'
function DeleteModal({handleDelete}) {
  return (
    <Popconfirm
    title="Delete !?"
    description="Are you sure to delete ?"
    okText="Yes"
    cancelText="No"
    onConfirm={()=>{
        handleDelete()
    }}
  >
    <Button> <span><AiFillDelete color='red' fontSize={'20px'}/></span> </Button>     
  </Popconfirm>
  )
}

export default DeleteModal