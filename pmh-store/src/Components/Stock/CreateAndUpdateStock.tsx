import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../AutoComplete/AutoComplete";
import { FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";

interface Unit {
  _id: string;
  unitCode: string;
  unitName: string;
  description: string;
}

interface Item {
  _id: string;
  name: string;
  code: string;
  unit: Unit;
  totalStock: number;
  category: string;
}

interface FormItem {
  item: Item | string;
  purchaseRate: number;
  purchasedQuantity: number;
  status: string;
  sellablePricePerUnit: number;
  name: string;
  code: string;
  unit: string;
}

interface FormData {
  vendor: Vendor;
  items: FormItem[];
  billAmount: number;
  payableAmount: number;
  payedAmount: number;
  account: any;
  _id:string
}

interface CreateAndUpdateStockProps extends PopupChildeProp {
  stockToEdit?: FormData | null;
}

const CreateAndUpdateStock: React.FC<CreateAndUpdateStockProps> = ({ handleClose, stockToEdit }) => {
  const [items, setItems] = useState<any[]>([
    {
      item: "",
      purchaseRate: 0,
      purchasedQuantity: 0,
      status: "active",
      sellablePricePerUnit: 0,
      name: "",
      code: "",
      unit: "",
    },
  ]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>();
  const { setLoadingState } = useLoading();
  const watchedItems = watch("items", items);

  useEffect(() => {
    if (stockToEdit) {
      reset(stockToEdit);
      setItems(stockToEdit.items);
    }
  }, [stockToEdit, reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoadingState(true);
      const body = {
        items: data.items.map((item: any) => ({
          item: item.name._id,
          purchaseRate: Number(item.total),
          purchasedQuantity: Number(item.purchasedQuantity),
          sellablePricePerUnit: Number(item.sellablePricePerUnit),
          purchasedRatePerUnit: Number(item.purchaseRate),
          purchasedUnit: item.unit._id
        })),
        vendor: data.vendor._id,
        payableAmount: Number(data.payableAmount),
        billAmount: Number(data.billAmount),
        payedAmount: Number(data.payedAmount),
        account: data.account._id
      };

      if (stockToEdit) {
        await axios.patch(`stock/stock/${stockToEdit._id}`, body);
      } else {
        await axios.post("stock/stock", body);
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting stock:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        item: "",
        purchaseRate: 0,
        purchasedQuantity: 0,
        status: "active",
        sellablePricePerUnit: 0,
        name: "",
        code: "",
        unit: "",
      },
    ]);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  const calculate = () => {
    let totalBillAmount = 0;
    watchedItems.forEach((item: any, index: number) => {
      if (item.purchasedQuantity && item.purchaseRate) {
        const total = Number(item.purchasedQuantity) * Number(item.purchaseRate);
        setValue(`items[${index}].total`, total);
        totalBillAmount += total;
      }
    });
    setValue("billAmount", totalBillAmount);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={3}>
          <AutoComplete
            register={register}
            errors={errors}
            name="vendor"
            label="Vendor"
            setValue={setValue}
            readField={"name"}
            url={`/entity/vendor?nameContains`}
            
          />
        </Col>
      </Row>

      <h5 className="mt-4">Items</h5>
      {items.map((_item: any, index: number) => (
        <div key={index}>
          <Row>
            <Col md={3}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].category`}
                label="Category"
                setValue={setValue}
                readField={"name"}
                url={`stock/category?nameContains`}
                
              />
            </Col>
            <Col md={3}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].name`}
                label="Item Name"
                setValue={(name: any, value: any) => {
                  setValue(name, value);
                }}
                readField={"name"}
                url={`stock/item?category=${
                  watch(`items[${index}].category`)
                    ? watch(`items[${index}].category`)._id
                    : ""
                }&nameContains`}
                
                onSelect={(e) => {
                  setValue(`items[${index}].code`, e);
                }}
                value={watch(`items[${index}].name`)}
              />
            </Col>
            <Col md={3}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].code`}
                label="Item Code"
                setValue={(name: any, value: any) => {
                  setValue(name, value);
                }}
                onSelect={(e) => {
                  setValue(`items[${index}].name`, e);
                }}
                readField={"code"}
                url={`stock/item?category=${
                  watch(`items[${index}].category`)
                    ? watch(`items[${index}].category`)._id
                    : ""
                }&codeContains`}
                
                value={watch(`items[${index}].code`)}
              />
            </Col>
            <Col md={3}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].unit`}
                label="Item Unit"
                setValue={(name: any, value: any) => {
                  setValue(name, value);
                }}
                readField={"unitName"}
                url={`core/units?measurement=${
                  watch(`items[${index}].name`)?.measurement
                }&unitNameContains`}
                
                disabled={!watch(`items[${index}].name`)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={3}>
              <Form.Group controlId={`formItemQuantity${index}`}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  {...register(`items[${index}].purchasedQuantity`, {
                    required: "Quantity is required",
                  })}
                  onBlur={() => {
                    calculate();
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formItemRatePerUnit${index}`}>
                <Form.Label>Rate Per Unit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Rate Per Unit"
                  {...register(`items[${index}].purchaseRate`, {
                    required: "Rate Per Unit is required",
                  })}
                  onBlur={() => {
                    calculate();
                  }}
                />

              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formItemSellablePrice${index}`}>
                <Form.Label>Sellable Price Per Unit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Sellable Price Per Unit"
                  {...register(`items[${index}].sellablePricePerUnit`)}

                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formItemTotal${index}`}>
                <Form.Label>Total Rate</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Total"
                  {...register(`items[${index}].total`)}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          {!stockToEdit && (
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

      <Row className="mt-4">
        <Col md={3}>
          <Form.Group controlId="formBillAmount">
            <Form.Label>Bill Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Bill Amount"
              {...register("billAmount", {
                required: "Bill Amount is required",
              })}
              isInvalid={!!errors.billAmount}
              disabled
            />
           
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formPayableAmount">
            <Form.Label>Payable Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Payable Amount"
              {...register("payableAmount", {
                required: "Payable Amount is required",
              })}
              isInvalid={!!errors.payableAmount}
            />
       
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formPayedAmount">
            <Form.Label>Payed Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Payed Amount"
              {...register("payedAmount", {
                required: "Payed Amount is required",
              })}
              isInvalid={!!errors.payedAmount}
            />
            
          </Form.Group>
        </Col>
        <Col md={3}>
          <AutoComplete
            register={register}
            errors={errors}
            name="account"
            label="Account"
            setValue={setValue}
            readField={"name"}
            url={`accounts/account?nameContains`}
            
          />
        </Col>
      </Row>

      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          <FaTimes /> Cancel
        </Button>
        <Button variant="primary" type="submit">
          <FaSave /> {stockToEdit ? 'Update' : 'Save'} Stock
        </Button>
      </div>
    </Form>
  );
};

export default CreateAndUpdateStock;
