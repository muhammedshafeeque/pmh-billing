import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import UnitTypeAhead from "../AutoCompleat/UnitTypeAhead";
import SectionMultiSelect from "../AutoCompleat/SectionMultySelect";
import RackMultiSelect from "../AutoCompleat/RackMultiSelect";

function CreateAndUpdateItem() {
  const { register, handleSubmit, control, watch, setValue } = useForm();
  const unitValue = watch("Unit");
  const sections = watch("sections");
  const onSubmit = (value) => {
    console.log(value)
  };
  const [selectedSections, setSelectedSections] = useState([]);
  useEffect(() => {
    if (unitValue) {
      setValue("measurement", unitValue.Quantity);
    }
    if (sections) {
      setSelectedSections(sections);
      setValue('racks',null) 
    }
  }, [unitValue, sections]);
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
              <UnitTypeAhead control={control} name={"Unit"} />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Measurement</Form.Label>
              <Form.Control
                {...register("measurement", { required: true })}
                type="text"
                disabled={true}
                placeholder="measurement"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Sections</Form.Label>
              <SectionMultiSelect control={control} name={"sections"} />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Racks</Form.Label>
              <RackMultiSelect
                control={control}
                sections={selectedSections}
                name={"racks"}
              />
            </Form.Group>
          </Row>
          <div  style={{display:"flex",justifyContent:"flex-end"}}>
            <Button className="mt-4" type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CreateAndUpdateItem;
