import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../AutoComplete/AutoComplete";
import MultiSelectAutoComplete from "../MultiSelect/MultiSelect";
import { FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";

interface Item {
  _id?: string;
  name: string;
  code: string;
  unit: string;
  quantity: number;
  category: string;
  rack: string[];
  remarks?: string;
}

interface CreateAndUpdateItemProps extends PopupChildeProp {
  itemToEdit?: Item | null;
}

const CreateAndUpdateItem: React.FC<CreateAndUpdateItemProps> = ({ handleClose, itemToEdit }) => {
  const [items, setItems] = useState<Item[]>([
    { name: "", code: "", unit: "", quantity: 0, category: "", rack: [] },
  ]);
  const [clearChild, setClearChild] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{ items: Item[] }>();
  const { setLoadingState } = useLoading();

  useEffect(() => {
    if (itemToEdit) {
      reset({ items: [itemToEdit] });
      setItems([itemToEdit]);
    }
  }, [itemToEdit, reset]);

  const onSubmit: SubmitHandler<{ items: Item[] }> = async (data) => {
    try {
      setLoadingState(true);
      let body: any[] = data.items.map(item => ({
        name: item.name,
        code: item.code,
        unit: item.unit._id,
        racks: item.rack.map((ra: any) => ra._id),
        totalStock: item.quantity,
        category: item.category._id,
        remark: item.remarks,
      }));

      if (itemToEdit) {
        await axios.patch(`stock/item/${itemToEdit._id}`, body[0]);
      } else {
        await axios.post("stock/item", body);
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting item:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { name: "", code: "", unit: "", quantity: 0, category: "", rack: [] },
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
          </Row>
          {!itemToEdit && (
            <Row className="mt-3">
              <Col className="d-flex justify-content-end">
                {index === items.length - 1 && (
                  <Button
                    onClick={handleAddItem}
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                  >
                    <FaPlus /> Add Item
                  </Button>
                )}
                {items.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <FaTrash /> Remove
                  </Button>
                )}
              </Col>
            </Row>
          )}
          {index < items.length - 1 && <hr className="mt-4 mb-4" />}
        </div>
      ))}
      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          <FaTimes /> Cancel
        </Button>
        <Button variant="primary" type="submit">
          <FaSave /> {itemToEdit ? 'Update' : 'Save'} Item
        </Button>
      </div>
    </Form>
  );
};

export default CreateAndUpdateItem;
