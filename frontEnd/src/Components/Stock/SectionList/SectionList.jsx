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
import CreateSection from "../CreateSection/CreateSection";
import axios from "../../../Axios/axios";
import DeleteModal from "../../Misc/DeleteModal/DeleteModal";
function SectionList() {
  const [section, setSection] = useState([]);
  const [flag,setFlag]=useState({})
  const toast=useToast()

  useEffect(() => {
  
    axios.get("stock/section").then((res) => {
      setSection(res.data);
    });
  }, [flag]);
  const handleDelete=async(item)=>{
    try {
     let res= await axios.delete(`stock/section/${item._id}`)
     setSection([])
      setFlag(res.data)
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
      <CreateSection  update={false} setFlage={setFlag}  />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Code</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {section.map((item) => {
              return (
                <Tr key={item._id}>
                  <Td>{item.name}</Td>
                  <Td>{item.code}</Td>
                  <Td display={"flex"} fontSize={'20px'}>
                    {" "}
                    <span  style={{color:'red',cursor:"pointer"}}>
                      <DeleteModal handleDelete={()=>handleDelete(item)}/>
                    
                    </span>
                    <span></span>
                    <span style={{color:'blue',cursor:'pointer'}}>
                    <CreateSection update={true} doc={item} setFlage={setFlag}  />
                    </span>{" "}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SectionList;
