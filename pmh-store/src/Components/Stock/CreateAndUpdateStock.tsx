import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../AutoComplete/AutoComplete";

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
}

const CreateAndUpdateStock: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const [items, setItems] = useState<FormItem[]>([
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
    formState: { errors },
  } = useForm<any>();
  const { setLoadingState } = useLoading();
  const [clearChild, setClearChild] = useState(false);
  const watchedItems = watch("items", items);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      setLoadingState(true);
      const body = {
        items: data.items.map((item: any) => ({
          item: item.name._id,
          purchaseRate: Number(item.total),
          purchasedQuantity: Number(item.purchasedQuantity),
          sellablePricePerUnit: Number(item.sellablePricePerUnit),
          purchasedRatePerUnit: Number(item.purchaseRate),
        })),
        vendor: data.vendor._id,
        payableAmount: Number(data.payableAmount),
        billAmount: Number(data.billAmount),
        payedAmount:Number(data.payedAmount),
        account:data.account._id
      };
      await axios.post("stock/stock", body);
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
      console.log(item);
      if (item.purchasedQuantity && item.purchaseRate) {
        const total =
          Number(item.purchasedQuantity) * Number(item.purchaseRate);
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
            clear={clearChild}
          />
        </Col>
      </Row>

      <h5 className="mt-4">Items</h5>
      {items.map((item: any, index: number) => (
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
                clear={clearChild}
              />
            </Col>
            <Col md={3}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].name`}
                label="Item Name"
                setValue={(name, value) => {
                  setValue(name, value);
                }}
                readField={"name"}
                url={`stock/item?category=${
                  watch(`items[${index}].category`)
                    ? watch(`items[${index}].category`)._id
                    : ""
                }&nameContains`}
                clear={clearChild}
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
                setValue={(name, value) => {
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
                clear={clearChild}
                value={watch(`items[${index}].code`)}
              />
            </Col>

            <Col md={3}>
              <AutoComplete
                register={register}
                errors={errors}
                name={`items[${index}].unit`}
                label="Item Unit"
                setValue={(name, value) => {
                  setValue(name, value);
                }}
                readField={"unitName"}
                url={`core/units?measurement=${
                  watch(`items[${index}].name`)?.unit.measurement
                    
                }&unitNameContains`}
                clear={clearChild}
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
                  isInvalid={!!errors.items?.[index]?.purchasedQuantity}
                  onBlur={() => {
                    calculate();
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.purchasedQuantity?.message}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.items?.[index]?.purchaseRate}
                  onBlur={() => {
                    calculate();
                  }}
                  
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.purchaseRate?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formItemSellablePrice${index}`}>
                <Form.Label>Sellable Price Per Unit</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Sellable Price Per Unit"
                  {...register(`items[${index}].sellablePricePerUnit`)}
                  isInvalid={!!errors.items?.[index]?.sellablePricePerUnit}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.sellablePricePerUnit?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId={`formItemTotal${index}`}>
                <Form.Label>Total Rate</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Total"
                  {...register(`items[${index}].total`)}
                  isInvalid={!!errors.items?.[index]?.total}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {errors.items?.[index]?.total?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              maxHeight: "40px",
            }}
          >
            {items.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteItem(index)}
                className="mt-2"
                style={{ marginRight: "10px" }}
              >
                Delete
              </Button>
            )}
            {items.length - 1 === index && (
              <Button size="sm" className="mt-2" onClick={handleAddItem}>
                Add Item
              </Button>
            )}
          </div>
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
            <Form.Control.Feedback type="invalid">
              {errors.billAmount?.message}
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              {errors.payableAmount?.message}
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              {errors.payedAmount?.message}
            </Form.Control.Feedback>
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
            clear={clearChild}
          />
        </Col>
      </Row>

      <Button type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default CreateAndUpdateStock;
