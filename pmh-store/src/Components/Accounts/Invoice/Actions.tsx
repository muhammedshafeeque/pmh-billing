import React, { useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaMoneyBillWave, FaSave, FaPrint, FaTimes } from "react-icons/fa";

const Action: React.FC<any> = ({ totals, invoiceItems, customer }) => {
  const [amountPaid, setAmountPaid] = useState(0);

  const handleSaveInvoice = () => {
    // Logic to save the invoice
    console.log("Saving invoice:", { customer, invoiceItems, totals, amountPaid });
  };

  const handlePrintInvoice = () => {
    // Logic to print the invoice
    console.log("Printing invoice");
  };

  return (
    <Form>
      <h4 className="mb-3 text-primary">Payment</h4>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label>Amount Paid</Form.Label>
        </Col>
        <Col xs={6}>
          <InputGroup>
            <InputGroup.Text><FaMoneyBillWave /></InputGroup.Text>
            <Form.Control
              size="sm"
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={4}>
          <Button variant="outline-secondary" size="sm" className="w-100">
            <FaTimes className="me-2" />
            Cancel
          </Button>
        </Col>
        <Col xs={4}>
          <Button variant="success" size="sm" className="w-100" onClick={handleSaveInvoice}>
            <FaSave className="me-2" />
            Save Invoice
          </Button>
        </Col>
        <Col xs={4}>
          <Button variant="primary" size="sm" className="w-100" onClick={handlePrintInvoice}>
            <FaPrint className="me-2" />
            Print Invoice
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Action;
