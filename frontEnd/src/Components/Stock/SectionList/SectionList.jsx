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
function SectionList() {
  const [section, setSection] = useState([]);
  useEffect(() => {
    axios.get("stock/section").then((res) => {
      setSection(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: "3rem" }}>
      <CreateSection  section={section} setSection={setSection}/>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Code</Th>
            </Tr>
          </Thead>
          <Tbody>
            {section.map((item)=>{
              return <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.code}</Td>
            </Tr>
            })}
            
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SectionList;
