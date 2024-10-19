import React from "react";
import { Table, Form, Button } from "react-bootstrap";

const ItemsForm: React.FC<{ setInvoiceItems: (items: any[]) => void; setTotals: (totals: any) => void }> = ({ setInvoiceItems, setTotals }) => {
  // Implement logic for adding, removing, and updating items

  return (
    <div>
      <h5>Items</h5>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through invoiceItems and render rows */}
        </tbody>
      </Table>
      {/* Add controls for manually adding items if needed */}
    </div>
  );
};

export default ItemsForm;
