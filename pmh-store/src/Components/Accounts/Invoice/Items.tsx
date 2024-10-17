import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Col, Table, Form } from "react-bootstrap";
import AutoComplete from "../../AutoComplete/AutoComplete";

const ItemsForm: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      items: [
        {
          name: "",
          code: "",
          category: "",
          unit: "",
          pricePerUnit: "",
          measurementType: "",
          quantity:'',
          total: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const autoFillWhenSelect=(i:number,item:any)=>{
    setValue(`items[${i}].category`, item.category);
    setValue(`items[${i}].pricePerUnit`, item.category);
    setValue(`items[${i}].measurementType`, item.unit.measurement);
    setValue(`items[${i}].unit`, item.unit.unitCode);
    
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Col className="inv-cards">
        <h5>Items</h5>
        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Category</th>
              <th>Unit</th>
              <th>quantity</th>
              <th>Price per Unit</th>
              <th>Measurement Type</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <AutoComplete
                    register={register}
                    errors={errors}
                    name={`items[${index}].name`}
                    setValue={(name: any, value: any) => {
                      setValue(name, value);
                    }}
                    readField={"name"}
                    url={`stock/stock?nameContains`}
                    // clear={clearChild}
                    onSelect={(e) => {
                      setValue(`items[${index}].code`, e);
                      autoFillWhenSelect(index,e)
                    }}
                    value={watch(`items[${index}].name`)}
                  />
                </td>
                <td>
                <AutoComplete
                    register={register}
                    errors={errors}
                    name={`items[${index}].code`}
                    setValue={(name: any, value: any) => {
                      setValue(name, value);
                    }}
                    readField={"code"}
                    url={`stock/stock?codeContains`}
                    // clear={clearChild}
                    onSelect={(e) => {
                      setValue(`items[${index}].name`, e);
                      autoFillWhenSelect(index,e)
                    }}
                    value={watch(`items[${index}].code`)}
                    
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].category`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size="sm" {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].unit`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size="sm" {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].quantity`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size="sm" {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].pricePerUnit`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size="sm" {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].measurementType`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size="sm" {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].total`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size="sm" {...field} />
                    )}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="primary"
            onClick={() =>
              append({
                name: "",
                code: "",
                category: "",
                unit: "",
                pricePerUnit: "",
                measurementType: "",
                total: "",
              })
            }
            size="sm"
          >
            Add Item
          </Button>
        </div>
      </Col>
    </Form>
  );
};

export default ItemsForm;
