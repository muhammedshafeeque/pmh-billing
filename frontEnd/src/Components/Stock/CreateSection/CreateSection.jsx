import {  Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import axios from "../../../Axios/axios";
function CreateSection() {
  const [open, setOpen] = useState(false);
  const handleSubmitForm=(values)=>{
    axios.post('/stock/section',values).then((res)=>{
        setOpen(false)
    })
  }
  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: "2rem" }}
        onClick={() => setOpen(true)}
      >
        Create New Section
      </Button>
      <Modal
        title="Create Rack "
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={[]}
      >
        <Form onFinish={handleSubmitForm}>
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
            name={'code'}
              rules={[{ required: true, message: "code is Mondatory!" }]}
            >
              <Input placeholder="code" />
            </Form.Item>
          </Row>
          <Row span={24} > 
            <Form.Item span={24} style={{width:'100%',display:"flex",justifyContent:"flex-end",paddingRight:'2rem'}} >
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
