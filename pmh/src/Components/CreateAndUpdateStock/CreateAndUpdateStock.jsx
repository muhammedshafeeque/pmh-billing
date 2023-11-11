import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ItemTypeAhead from "../AutoCompleat/ItemTypeAhed";
import RackMultiSelect from "../AutoCompleat/RackMultiSelect";
import axios from "../../Api/Axios";

function CreateAndUpdateStock(props) {
  const { register, handleSubmit, control, watch, setValue } = useForm();
  const [racks, setRacks] = useState();
  const item = watch("item");
  const amount = watch("amount");
  const price = watch("price");
  const quantity = watch("quantity");
  const onSubmit = async (value) => {
    try {
      console.log(value);
      let body = {
        item: value.item._id,
        rack:[],
        purchaseRate:0,
        purchasedQuantity:0,
        sellablePrice:0,
        expiry:'12/12/2012'
      };
      value.racks.forEach((item)=>{
        body.rack.push(item.value)
      })

      let { data } = await axios.post("/stock/stock", body);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (item) {
      setRacks(item.racks);
      setValue("unit", item.unit.Name);
      setValue("racks", null);
    }
  }, [item]);
  useEffect(() => {
    if (amount && price && quantity) {
      let tProfit = price * quantity - amount;
      setValue("expectedProfit", tProfit);
      setValue("expectedPerUint", tProfit / quantity);
    }
  }, [amount, price, quantity]);
  return (
    <div>
      {" "}
      <Container>
        <h4 style={{ textAlign: "center" }}>Add New Stock</h4>
        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Item</Form.Label>
              <ItemTypeAhead
                control={control}
                rules={{ required: true }}
                name={"item"}
              />
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
              <Form.Label>Purchase Amount</Form.Label>
              <Form.Control
                type="number"
                {...register("amount", { required: true })}
                placeholder="amount"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="sectionName">
              <Form.Label>Sellable Price</Form.Label>
              <Form.Control
                type="number"
                {...register("price", { required: true })}
                placeholder="price"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} md="4" controlId="sectionName">
              <Form.Label>Total Expect Profit</Form.Label>
              <Form.Control
                type="number"
                {...register("expectedProfit", {
                  required: true,
                  disabled: true,
                })}
                placeholder="price"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="sectionName">
              <Form.Label>Total Expect Profit Per unit</Form.Label>
              <Form.Control
                type="number"
                {...register("expectedPerUint", {
                  required: true,
                  disabled: true,
                })}
                placeholder="price"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="sectionName">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                {...register("expiryDate", {
                  required: true,
                })}
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
