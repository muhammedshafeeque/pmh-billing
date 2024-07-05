import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Col, Table, Form } from "react-bootstrap";

const ItemsForm: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      items: [
        {
          name: "",
          code: "",
          category: "",
          unit: "",
          pricePerUnit: "",
          measurementType: "",
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
                  <Controller
                    name={`items[${index}].name`}
                    control={control}
                    
                    render={({ field }) => (
                      <Form.Control type="text" size='sm' {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].code`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size='sm' {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].category`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size='sm' {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].unit`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size='sm' {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].pricePerUnit`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size='sm' {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].measurementType`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size='sm' {...field} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`items[${index}].total`}
                    control={control}
                    render={({ field }) => (
                      <Form.Control type="text" size='sm' {...field} />
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
