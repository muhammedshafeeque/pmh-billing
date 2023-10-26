import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "../../Api/Axios";
import { mainEndPoint } from "../../Constants/ApiConstants/mainRoutes";
import { configEndPoints } from "../../Constants/ApiConstants/config";
import { useAlert } from "react-alert";

function CreateAndUpdateSection(props) {
  const { register, handleSubmit } = useForm();
  const alert = useAlert();
  const onSubmit = (value) => {
    ;
    axios
      .post(mainEndPoint.STOCK + configEndPoints.SECTION, value)
      .then(({ data }) => {
        alert.success("Section Created Successfully");
        ;
        props.onHide();
      })
      .catch((err) => {
        alert.error(err.response.data.message);
        ;
      });
  };
  return (
    <div className="p-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group controlId="sectionName">
            <Form.Label>Section Name</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter section name"
            />
          </Form.Group>
          <Form.Group controlId="sectionCode">
            <Form.Label>Section Code</Form.Label>
            <Form.Control
              {...register("code", { required: true })}
              type="text"
              placeholder="Enter section code"
            />
          </Form.Group>
        </Row>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" className="mt-4" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateAndUpdateSection;
