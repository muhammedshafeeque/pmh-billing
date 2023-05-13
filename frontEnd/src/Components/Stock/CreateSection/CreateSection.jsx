import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import axios from "../../../Axios/axios";
import { useToast } from "@chakra-ui/react";
import { AiFillDelete} from 'react-icons/ai'
function CreateSection({ section, setSection,update }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [form] = Form.useForm();
  const handleSubmitForm = async (values) => {
    try {
      let res = await axios.post("/stock/section", values);
      toast({
        title: res.data,
        description: "New Section Added Sucessfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      values._id = 1;
      setSection([...section, values]);
      form.resetFields();
      setOpen(false)
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
  };
  return (
    <>
    {update? <AiFillDelete onClick={()=>{
      setOpen(true)
    }} />:    <Button 
        type="primary"
        style={{ marginBottom: "2rem" }}
        onClick={() => {setOpen(true) 
          form.resetFields()}}
      >
        Create New Section
      </Button>}
  
      <Modal
        title="Create Section"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={[]}
      >
        <Form form={form} onFinish={handleSubmitForm}>
          <Row>
            <Col span={12}>
              <Form.Item
                name={"name"}
                rules={[{ required: true, message: "name is Mondatory!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Form.Item
              name={"code"}
              rules={[{ required: true, message: "code is Mondatory!" }]}
            >
              <Input placeholder="code" />
            </Form.Item>
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
                }}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default CreateSection;
