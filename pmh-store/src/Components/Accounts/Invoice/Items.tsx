import React, { useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { UseFieldArrayReturn, UseFormRegister, Control, useWatch } from 'react-hook-form';

interface InvoiceItem {
  _id: string;
  name: string;
  code: string;
  price: number;
  quantity: number;
  unit: string;
  unitCode: string;
}

interface InvoiceForm {
  items: InvoiceItem[];
}

interface ItemsProps {
  fields: UseFieldArrayReturn<InvoiceForm, 'items', 'id'>['fields'];
  register: UseFormRegister<InvoiceForm>;
  control: Control<InvoiceForm>;
  remove: (index: number) => void;
  onTotalChange: (total: number) => void;
  disabled?: boolean;
}

const Items: React.FC<ItemsProps> = ({ fields, register, control, remove, onTotalChange, disabled = false }) => {
  const items = useWatch({
    control,
    name: "items",
  });

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    onTotalChange(total);
  }, [items, onTotalChange]);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Item</th>
          <th>Code</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((item, index) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.code}</td>
            <td>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                disabled={disabled}
                {...register(`items.${index}.price` as const, { valueAsNumber: true })}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                step="0.01"
                min="0.01"
                disabled={disabled}
                {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
              />
            </td>
            <td>{item.unitCode}</td>
            <td>{(items[index]?.price * items[index]?.quantity).toFixed(2)}</td>
            <td>
              <Button 
                variant="danger" 
                size="sm" 
                disabled={disabled}
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Items;
