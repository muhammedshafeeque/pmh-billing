import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import axios from "../../../Axios/axios";
import { useToast } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import SectionAutoCompleate from "../../Misc/AutoCompleate/SectionAutoCompleate";
import RackAutoCompleate from "../../Misc/AutoCompleate/RackAutoCompleate";
import UnitDropDown from "../../Misc/DropDowns/UnitDropDown";
import RackMultiSelect from "../../Misc/MultiSelects/RackMultiSelect";
function CreateItem({ update, doc, setFlage }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [form] = Form.useForm();
  const [initialValue, setInitialValue] = useState({});
  const [section, setSection] = useState(null);

  const handleSubmitForm = async (values) => {
    let data = {
      name: values.name,
      code: values.code,
      section: values.section._id,
      unit:values.unit,
      activeracks:[]
    };
    values.rack.forEach((item)=>{
      data.activeracks.push(item._id)
    })
    if (update) {
      try {
        let res = await axios.patch(`/stock/rack/${doc._id}`, data);
        form.resetFields();
        toast({
          title: "Success",
          description: "Rack Updated Sucessfully",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

        setFlage(res.data);
        setOpen(false);
      } catch (error) {
        toast({
          title: "Failed",
          description: error.response.data,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      try {
        let res = await axios.post("/stock/item", data);
        toast({
          title: res.data,
          description: "New Rack Added Sucessfully",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        setFlage(values);
        form.resetFields();
        setOpen(false);
      } catch (error) {
        toast({
          title: "Failed",
          description: "Name or code Allready Exist",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };
  return (
    <>
      {update ? (
        <AiFillEdit
          onClick={() => {
            setOpen(true);
            setInitialValue(doc);
          }}
        />
      ) : (
        <Button
          type="primary"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            setOpen(true);
            form.resetFields();
          }}
        >
          Add New Item
        </Button>
      )}

      <Modal
        title="Create Item"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={[]}
      >
        <Form
          form={form}
          initialValues={initialValue}
          onFinish={handleSubmitForm}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name={"name"}
                rules={[{ required: true, message: "name is Mondatory!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
              name={"code"}
              rules={[{ required: true, message: "code is Mondatory!" }]}
            >
              <Input placeholder="code" />
            </Form.Item>
            </Col>
            
          </Row>
          <Row span={24}>
            <Col span={12}>
              <Form.Item
                name={"section"}
                span={24}
                //   rules={[{ required: true, message: "section is Mondatory!" }]}
              >
                <SectionAutoCompleate
                  section={doc ? doc.section : null}
                  changeValue={(value) => {
                    setSection(value);
                    form.setFieldsValue({ section: value });
                  }}
                ></SectionAutoCompleate>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item span={12}
                name={"rack"}
                rules={[{ required: true, message: "Rack is Mondatory!" }]}
              >
                <RackMultiSelect selectValue={(value)=>{
                    form.setFieldsValue({ rack: value });
                }}>

                </RackMultiSelect>
              </Form.Item>
            </Col>
          </Row>
          <Row span={24}>
            <Col span={12}>
              <Form.Item name={"unit"}
                rules={[{ required: true, message: "Unit is Mondatory!" }]} 
                >
                <UnitDropDown selectValue={(value)=>{
                   form.setFieldsValue({unit:value})   
                }} />
              </Form.Item>
            </Col>
          </Row>
          <Row span={24}>
            <Form.Item
              span={24}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "2rem",
              }}
            >
              <Button
                htmlType="button"
                onClick={() => {
                  form.resetFields();
                  if (update) {
                    setInitialValue(doc);
                  }
                }}
              >
                Reset
              </Button>

              <Button type="primary" htmlType="submit">
                {update ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default CreateItem;
