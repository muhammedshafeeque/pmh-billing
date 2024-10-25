import React from "react";
import { Button } from "react-bootstrap";

const Action: React.FC<{ totals: any; invoiceItems: any[]; customer: any }> = ({ totals, invoiceItems, customer }) => {
  const handlePayment = () => {
    console.log(invoiceItems)
  };

  const handleCancel = () => {
    // Implement cancel logic
  };

  return (
    <div>
      <Button variant="success" className="me-2" onClick={handlePayment}>
        Process Payment (F2)
      </Button>
      <Button variant="danger" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default Action;
