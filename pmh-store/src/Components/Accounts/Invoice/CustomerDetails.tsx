import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CustomerDetails: React.FC<{ setCustomer: (customer: any) => void }> = ({ setCustomer }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLookup = () => {
    // Implement customer lookup logic here
    // On successful lookup, call setCustomer with the customer data
  };

  return (
    <div>
      <h5>Customer Details</h5>
      <Form.Group className="mb-2">
        <Form.Control
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <Button variant="outline-primary" size="sm" onClick={handleLookup}>
        Lookup Customer (F3)
      </Button>
    </div>
  );
};

export default CustomerDetails;
