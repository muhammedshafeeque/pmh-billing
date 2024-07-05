import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Col, Form, Row } from "react-bootstrap";
import "./accounts.scss";
import AutoComplete from "../../AutoComplete/AutoComplete";

const CostumerDetails: React.FC = () => {
  const [clearChild, setClearChild] = useState(false);
  const { control, handleSubmit, register, errors, setValue }:any = useForm({
    defaultValues: {
      customerName: "",
      mobile: "",
      address: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Col className="inv-cards">
        <h4 className="invoice-heads">Invoice To</h4>
        <Row onBlur={() => handleSubmit(onSubmit)()}>
          <Col>
            <Form.Group controlId="customerName">
              {/* <Form.Label>Customer Name</Form.Label> */}
              <AutoComplete
                register={register}
                errors={errors}
                name="name"
                label="Customer Name"
                setValue={setValue}
                readField={"name"}
                url={`/entity/customer?nameContains`}
                isRequired={true}
                clear={clearChild}
                editable={true}
              />
              {/* <Controller
                name="customerName"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    size="sm"
                    required
                    type="text"
                    placeholder="First name"
                    {...field}
                    
                  />
                )}
              /> */}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    required
                    type="number"
                    size="sm"
                    placeholder="Mobile Number"
                    {...field}
                  />
                )}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    size="sm"
                    as="textarea"
                    placeholder="Leave a comment here"
                    {...field}
                  />
                )}
              />
            </Form.Group>
          </Col>
        </Row>
      </Col>
    </Form>
  );
};

export default CostumerDetails;
