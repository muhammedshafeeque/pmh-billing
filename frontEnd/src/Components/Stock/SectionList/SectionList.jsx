import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateSection from "../CreateSection/CreateSection";
import axios from "../../../Axios/axios";
import { AiFillDelete } from "react-icons/ai";
function SectionList() {
  const [section, setSection] = useState([]);
  const [flag,setFlag]=useState({})
  useEffect(() => {
    axios.get("stock/section").then((res) => {
      setSection(res.data);
    });
  }, [flag]);

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
                      <AiFillDelete/>
                    
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
