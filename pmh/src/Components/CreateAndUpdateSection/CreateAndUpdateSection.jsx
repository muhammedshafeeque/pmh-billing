import React from "react";
import { Button, Form, Row } from "react-bootstrap";

function CreateAndUpdateSection(props) {
  return (
    <div className="p-4">
      <Form>
        <Row>
          <Form.Group controlId="sectionName">
            <Form.Label>Section Name</Form.Label>
            <Form.Control type="text" placeholder="Enter section name" />
          </Form.Group>
          <Form.Group controlId="sectionCode">
            <Form.Label>Section Code</Form.Label>
            <Form.Control type="text" placeholder="Enter section code" />
          </Form.Group>
        </Row>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="primary"
            onClick={props.onHide}
            className="mt-4"
            type="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateAndUpdateSection;
