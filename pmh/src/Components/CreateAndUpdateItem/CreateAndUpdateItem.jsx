import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

function CreateAndUpdateItem() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (value) => {};
  return (
    <div>
      <Container>
        <h4 style={{ textAlign: "center" }}>Create Item</h4>
        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name", { required: true })}
                type="text"
                placeholder="name"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Code</Form.Label>
              <Form.Control
                {...register("code", { required: true })}
                type="text"
                placeholder="Code"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                {...register("unit", { required: true })}
                type="text"
                placeholder="unit"
              />
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default CreateAndUpdateItem;
