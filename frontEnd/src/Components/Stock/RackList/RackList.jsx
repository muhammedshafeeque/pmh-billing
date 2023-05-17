import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateRack from "../CreateRack/CreateRack";
import axios from '../../../Axios/axios'
import DeleteModal from "../../Misc/DeleteModal/DeleteModal";
function RackList() {
  const toast=useToast()
  const [reload,setReload]=useState()
  const [racks,setRacks]=useState([])
  const handleSearch=async()=>{
    let {data}=await axios.get("/stock/rack")
    setRacks(data)
  }
  useEffect(()=>{
    handleSearch()
  },[reload])
  const handleDelete=async(item)=>{
    try {
      let res= await axios.delete(`stock/rack/${item._id}`)
       setReload(res)
       toast({
         title: 'Success',
         description: 'Item Removed Successfully ',
         status: "success",
         duration: 5000,
         isClosable: true,
         position: "top-right",
       });
     } catch (error) {
       toast({
         title: 'Failed',
         description: error.response.data,
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "top-right",
       });
     };
  }
  return (
    <div style={{ marginTop: "3rem" }}>
      <CreateRack setFlage={setReload} />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>code</Th>
              <Th >Section</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {racks.map((item)=>{
              return <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.code}</Td>
              <Td >{item.section.name}</Td>
              <Td display={"flex"} fontSize={'20px'}>
                    {" "}
                    <span  style={{color:'red',cursor:"pointer"}}>
                      <DeleteModal handleDelete={()=>handleDelete(item)}/>
                    
                    </span>
                    <span></span>
                    <span style={{color:'blue',cursor:'pointer'}}>
                      <CreateRack update={true} doc={item} setFlage={setReload}/>
             
                    </span>{" "}
                  </Td>
            </Tr>
            })}
            
            
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RackList;
