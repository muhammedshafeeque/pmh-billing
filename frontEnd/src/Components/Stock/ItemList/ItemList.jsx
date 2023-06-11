import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "antd";
import "./ItemList.scss";
import SectionAutoCompleate from "../../Misc/AutoCompleate/SectionAutoCompleate";
import RackAutoCompleate from "../../Misc/AutoCompleate/RackAutoCompleate";
import ItemAutoCompleate from "../../Misc/AutoCompleate/ItemAutoCompleate";
import axios from "../../../Axios/axios";
import CreateItem from "../CreateItem/CreateItem";
import DeleteModal from "../../Misc/DeleteModal/DeleteModal";
function ItemList() {
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const toast = useToast();
  const [reload, setReload] = useState();
  const handleSearch = async (values) => {
    try {
      let { data } = await axios.get(
        `/stock/item?id=${values.item ? values.item._id : ""}&rack=${
          values.rack ? values.rack._id : ""
        }&section=${values.section ? values.section._id : ""}`
      );
      setItems(data);
    } catch (error) {
      toast({
        title: "Failed",

        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    axios.get(`/stock/item?limit=10`).then((res) => {
      setItems(res.data);
    });
  }, [reload]);
  const handleDelete = async (item) => {
    axios
      .delete(`/stock/item/${item._id}`)
      .then(() => {
        setReload(['d'])
        toast({
          title: "Deleted Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed",

          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <div>
      <Text mt={5}>Search Item</Text>
      <Box display={"flex"} justifyContent={"space-between"} mt={3}>
        <Form form={form} onFinish={handleSearch}>
          <Row span={24}>
            <Form.Item name={"section"} className="search-input">
              <SectionAutoCompleate
                changeValue={(value) => {
                  form.setFieldsValue({ section: value });
                }}
              />
            </Form.Item>

            <Form.Item name={"rack"} className="search-input">
              <RackAutoCompleate
                section={
                  form.getFieldValue("section")
                    ? form.getFieldValue("section")._id
                    : ""
                }
                changeValue={(value) => {
                  form.setFieldsValue({ rack: value });
                }}
              />
            </Form.Item>
            <Form.Item name={"item"} className="search-input">
              <ItemAutoCompleate
                section={
                  form.getFieldValue("section")
                    ? form.getFieldValue("section")._id
                    : ""
                }
                rack={
                  form.getFieldValue("rack")
                    ? form.getFieldValue("rack")._id
                    : ""
                }
                changeValue={(value) => {
                  form.setFieldsValue({ item: value });
                }}
              />
            </Form.Item>

            <Form.Item>
              <Row>
                <Button
                  type="primary"
                  onClick={() => {
                    form.resetFields();
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Clear
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  Search
                </Button>
              </Row>
            </Form.Item>
          </Row>
        </Form>
        <CreateItem />
      </Box>
      <h5>Results</h5>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>code</Th>
            <Th>Racks</Th>
            <Th>Total Stock</Th>

            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => {
            return (
              <Tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>{item.code}</Td>
                <Td>
                  {" "}
                  {item.activeracks.map((rack) => {
                    return (
                      <span
                        key={rack._id}
                        style={{
                          backgroundColor: "#dce0dd",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {rack.code}
                      </span>
                    );
                  })}
                </Td>
                <Td>
                  {item.totalStock} {item.unit}
                </Td>
                <Td display={"flex"}>
                  <span style={{ color: "red", cursor: "pointer" }}>
                    <DeleteModal handleDelete={() => handleDelete(item)} />
                  </span>
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    <CreateItem update={true} doc={item} setFlage={setReload} />
                  </span>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ItemList;
