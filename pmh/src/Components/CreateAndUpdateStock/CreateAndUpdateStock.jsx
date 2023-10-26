import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ItemTypeAhead from "../AutoCompleat/ItemTypeAhed";
import RackMultiSelect from "../AutoCompleat/RackMultiSelect";

function CreateAndUpdateStock(props) {
  const { register, handleSubmit, control, watch, setValue } = useForm();
  const [racks, setRacks] = useState();
  const item = watch("item");
  const onSubmit = (value) => {};
  useEffect(() => {
    if (item) {
      setRacks(item.racks);
      console.log(item.unit.Name);
      setValue("unit", item.unit.Name);
    }
  }, [item]);
  return (
    <div>
      {" "}
      <Container>
        <h4 style={{ textAlign: "center" }}>Add New Stock</h4>
        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Item</Form.Label>
              <ItemTypeAhead control={control} name={"item"} />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Racks</Form.Label>
              <RackMultiSelect control={control} racks={racks} name={"racks"} />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="sectionName">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                {...register("unit", { required: true, disabled: true })}
                placeholder="unit"
              />
            </Form.Group>
          </Row>
          <Row className="mt-2">
            <Form.Group as={Col} md="4" controlId="sectionName">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                {...register("quantity", { required: true })}
                placeholder="Quantity"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="sectionName">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                {...register("amount", { required: true })}
                placeholder="Amount"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="sectionName">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                {...register("price", { required: true })}
                placeholder="price"
              />
            </Form.Group>
          </Row>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button className="mt-4" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default CreateAndUpdateStock;
