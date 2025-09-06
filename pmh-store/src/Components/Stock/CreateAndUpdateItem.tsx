import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../AutoComplete/AutoComplete";
import MultiSelectAutoComplete from "../MultiSelect/MultiSelect";
import { FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";

interface PopupChildeProp {
  handleClose: () => void;
}

interface Unit {
  _id: string;
  unitCode: string;
  unitName: string;
  description: string;
  measurement: string;
  iso: string;
  conversionToParent: number;
  parentUnit: string;
}

interface Category {
  _id: string;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Rack {
  _id: string;
  name: string;
  code: string;
  section: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Item {
  _id?: string;
  name: string;
  code: string;
  unit: Unit | string;
  category: Category | string;
  rack?: Rack[] | string[];
  racks?: Rack[] | string[]; // API returns racks array
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface CreateAndUpdateItemProps extends PopupChildeProp {
  itemToEdit?: Item | null;
}

const CreateAndUpdateItem: React.FC<CreateAndUpdateItemProps> = ({ handleClose, itemToEdit }) => {
  const [items, setItems] = useState<Item[]>([
    { name: "", code: "", unit: "", category: "", rack: [] },
  ]);
  const [clearChild] = useState(false);
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
      // Map the itemToEdit to match the form structure
      const formattedItem = {
        ...itemToEdit,
        unit: typeof itemToEdit.unit === 'object' ? itemToEdit.unit : itemToEdit.unit,
        category: typeof itemToEdit.category === 'object' ? itemToEdit.category : itemToEdit.category,
        rack: Array.isArray(itemToEdit.racks) ? itemToEdit.racks : (Array.isArray(itemToEdit.rack) ? itemToEdit.rack : [])
      };
      reset({ items: [formattedItem] });
      setItems([formattedItem]);
    }
  }, [itemToEdit, reset]);

  const onSubmit: SubmitHandler<{ items: Item[] }> = async (data) => {
    try {
      setLoadingState(true);
      let body: any[] = data.items.map(item => ({
        name: item.name,
        code: item.code,
        unit: typeof item.unit === 'object' ? (item.unit as any)._id : item.unit,
        racks: Array.isArray(item.rack) ? item.rack.map((ra: any) => typeof ra === 'object' ? ra._id : ra) : [],
        category: typeof item.category === 'object' ? (item.category as any)._id : item.category,
        remark: item.remarks || undefined,
      }));

      if (itemToEdit) {
        // Remove database fields for update
        const { _id, createdAt, updatedAt, __v, ...updateData } = body[0];
        await axios.patch(`stock/item/${itemToEdit._id}`, updateData);
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
      { name: "", code: "", unit: "", category: "", rack: [] },
    ]);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {items.map((_, index) => (
        <div key={index}>
          <Row>
            <Col md={3}>
              <Form.Group controlId={`formItemName${index}`}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Item name"
                  {...register(`items.${index}.name` as const, {
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
                  {...register(`items.${index}.code` as const, {
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
                setValue={(name: string, value: any) => setValue(name as any, value)}
                readField={"unitName"}
                url={`/core/units?unitNameContains`}
                clear={clearChild}
                value={typeof items[index]?.unit === 'object' ? items[index].unit : null}
              />
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formRemark${index}`}>
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Remarks"
                  {...register(`items.${index}.remarks` as const)}
                  isInvalid={!!errors.items?.[index]?.remarks}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.remarks?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].category`}
                label="Category"
                setValue={(name: string, value: any) => setValue(name as any, value)}
                readField={"name"}
                url={`/stock/category?nameContains`}
                clear={clearChild}
                isRequired={true}
                value={typeof items[index]?.category === 'object' ? items[index].category : null}
              />
            </Col>
            <Col md={6}>
              <MultiSelectAutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].rack`}
                label="Rack"
                setValue={(name: string, value: any) => setValue(name as any, value)}
                readField={"name"}
                url={`/stock/rack?nameContains`}
                clear={clearChild}
                value={Array.isArray(items[index]?.rack) ? items[index].rack as Rack[] : (Array.isArray(items[index]?.racks) ? items[index].racks as Rack[] : [])}
              />
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
