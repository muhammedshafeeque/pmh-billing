import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, Row } from "antd";
import "./ItemList.scss";
import SectionAutoCompleate from "../../Misc/AutoCompleate/SectionAutoCompleate";
import RackAutoCompleate from "../../Misc/AutoCompleate/RackAutoCompleate";
import ItemAutoCompleate from "../../Misc/AutoCompleate/ItemAutoCompleate";
function ItemList() {
  const [form] = Form.useForm();
  const [initialSearch, setInitialSearch] = useState({});
  const handleSearch = () => {};
  return (
    <div>
      <Form form={form} initialValues={initialSearch} onFinish={handleSearch}>
        <Row span={24}>
          <Form.Item name={"item"} className="search-input">
            <ItemAutoCompleate
              changeValue={(value) => {
                
                form.setFieldsValue({ item: value });
              }}
            />
          </Form.Item>
          <Form.Item
            name={"rack"}
            changeValue={(value) => {
              console.log(value)
              form.setFieldsValue({ rack: value });
            }}
            className="search-input"
          >
            <RackAutoCompleate />
          </Form.Item>
          <Form.Item
            name={"section"}
            className="search-input"
            changeValue={(value) => {
              console.log(value)
              form.setFieldsValue({ section: value });
            }} 
          >
            <SectionAutoCompleate />
          </Form.Item>
        </Row>
      </Form>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>code</Th>
            <Th>Section</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}

export default ItemList;
