import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../AutoComplete/AutoComplete";
import MultiSelectAutoComplete from "../MultiSelect/MultiSelect";

interface Item {
  name: string;
  code: string;
  unit: string;
  quantity: number;
  category: string;
  rack: string;
  remarks?: string;
}

const CreateAndUpdateItem: React.FC<PopupChildeProp> = ({ handleClose }) => {
  const [items, setItems] = useState<Item[]>([
    { name: "", code: "", unit: "", quantity: 0, category: "", rack: "" },
  ]);
  const [clearChild, setClearChild] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Item>();
  const { setLoadingState } = useLoading();

  const onSubmit: SubmitHandler<Item> = async (data: any) => {
    try {
      setLoadingState(true);
      let body: any[] = [];
      data.items.forEach((item: any) => {
        let obj = {
          name: item.name,
          code: item.code,
          unit: item.unit._id,
          racks: [],
          totalStock: item.quantity,
          category: item.category._id,
          remark: item.remark,
        };

        item.rack.forEach((ra: any) => {
          obj.racks.push(ra._id);
        });

        body.push(obj);
      });
      await axios.post("stock/item", body);
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { name: "", code: "", unit: "", quantity: 0, category: "", rack: "" },
    ]);
  };
  const handleDeleteItem = (indexToDelete: number) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {items.map((item, index) => (
        <div key={index}>
          <Row>
            <Col md={3}>
              <Form.Group controlId={`formItemName${index}`}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Item name"
                  {...register(`items[${index}].name`, {
                    required: "Name is required",
                  })}
                  isInvalid={!!errors.items?.[index]?.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formItemCode${index}`}>
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Item code"
                  {...register(`items[${index}].code`, {
                    required: "Code is required",
                  })}
                  isInvalid={!!errors.items?.[index]?.code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.code?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].unit`}
                label="Unit"
                setValue={setValue}
                readField={"unitName"}
                url={`/core/units?unitNameContains`}
                clear={clearChild}
              />
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formQuantity${index}`}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  {...register(`items[${index}].quantity`, {
                    required: "Quantity is required",
                  })}
                  isInvalid={!!errors.items?.[index]?.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.quantity?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={3}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].category`}
                label="Category"
                setValue={setValue}
                readField={"name"}
                url={`/stock/category?nameContains`}
                clear={clearChild}
                isRequired={true}
              />
            </Col>
            <Col md={3}>
              <MultiSelectAutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].rack`}
                label="Rack"
                setValue={setValue}
                readField={"code"}
                url={`/stock/rack?codeContains`}
                clear={clearChild}
              />
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formRemark${index}`}>
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Remarks"
                  {...register(`items[${index}].remarks`)}
                  isInvalid={!!errors.items?.[index]?.remarks}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.remarks?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col
              className="mt-3 "
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                onClick={handleAddItem}
                className="ml-2 mt-3 mr-2"
                size="sm"
                style={{ marginRight: "10px", maxHeight: "40px" }}
              >
                Add
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteItem(index)}
                className="ml-2 mt-3"
                style={{ maxHeight: "40px" }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </div>
      ))}
      <Button variant="primary" type="submit" className="mt-3" size="sm">
        Submit
      </Button>
    </Form>
  );
};

export default CreateAndUpdateItem;
