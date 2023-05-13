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
import { AiFillEdit } from "react-icons/ai";
function SectionList() {
  const [section, setSection] = useState([]);
  useEffect(() => {
    axios.get("stock/section").then((res) => {
      setSection(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: "3rem" }}>
      <CreateSection section={section} update={false} setSection={setSection} />
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
                    <CreateSection section={section} update={true} doc={item} setSection={setSection} />
                    </span>
                    <span></span>
                    <span style={{color:'blue',cursor:'pointer'}}>
                      <AiFillEdit />
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