import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";

import { FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";

interface Item {
  _id?: string;
  name: string; // Assuming name is a string
  code: string; // Assuming code is a string
  unit: { _id: string; unitName: string }; // Assuming unit is an object with _id and unitName
  quantity: number;
  category: { _id: string; name: string }; // Assuming category is an object with _id and name
  rack: { _id: string; code: string }[]; // Assuming rack is an array of objects with _id and code
  remarks?: string;
}

interface CreateAndUpdateItemProps {
  handleClose: () => void;
  itemToEdit?: Item | null;
}

const CreateAndUpdateItem: React.FC<CreateAndUpdateItemProps> = ({ handleClose, itemToEdit }) => {
  const [items, setItems] = useState<Item[]>([
    { name: "", code: "", unit: { _id: "", unitName: "" }, quantity: 0, category: { _id: "", name: "" }, rack: [] },
  ]);
  const {
    register,
    handleSubmit,
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
      const body = data.items.map((item) => ({
        name: item.name,
        code: item.code,
        unit: item.unit._id,
        racks: item.rack.map((ra) => ra._id),
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
      { name: "", code: "", unit: { _id: "", unitName: "" }, quantity: 0, category: { _id: "", name: "" }, rack: [] },
    ]);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {items.map((_item, index) => (
        <div key={index}>
          <Row>
            <Col md={3}>
              <Form.Group controlId={`formItemName${index}`}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Item name"
                  {...register(`items.${index}.name`, {
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
                  {...register(`items.${index}.code`, {
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
              <Form.Group controlId={`formItemQuantity${index}`}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  {...register(`items.${index}.quantity`, {
                    required: "Quantity is required",
                    min: { value: 0, message: "Quantity cannot be negative" },
                  })}
                  isInvalid={!!errors.items?.[index]?.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.quantity?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button variant="danger" onClick={() => handleDeleteItem(index)}>
                <FaTrash /> Delete
              </Button>
            </Col>
          </Row>
          {/* Additional fields for unit, category, and rack can be added here */}
        </div>
      ))}
      <Button variant="primary" onClick={handleAddItem}>
        <FaPlus /> Add Item
      </Button>
      <Button variant="success" type="submit">
        <FaSave /> Save
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        <FaTimes /> Cancel
      </Button>
    </Form>
  );
};

export default CreateAndUpdateItem;