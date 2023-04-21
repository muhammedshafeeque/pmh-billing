import { Button, Col, Input, Modal, Row } from 'antd';
import { useState } from 'react';

function CreateRack() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" style={{marginBottom:'2rem'}}  onClick={() => setOpen(true)}>
        Create Rack
      </Button>
      <Modal
        title="Create Rack "
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
       
      >
       <Row>
        <Col  span={12}><Input placeholder="Name" /></Col>
        <Col span={12}><Input placeholder="Code" /></Col>
       </Row>
       <Row style={{marginTop:'1rem'}}>
        <Col  span={12}><Input placeholder="Section" /></Col>
       </Row>
      </Modal>
    </>
  )
}

export default  CreateRack
