import React, { useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import CostumerDetails from "../../Components/Accounts/Invoice/CostomerDetails";
import InvoiceDetails from "../../Components/Accounts/Invoice/InvoiceDetails";
import ItemsForm from "../../Components/Accounts/Invoice/Items";
import InvoiceTotals from "../../Components/Accounts/Invoice/Totals";
import Action from "../../Components/Accounts/Invoice/Actions";

const CreateInvoice: React.FC = () => {
  const [customer, setCustomer] = useState<any>();
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    billAmount: 0,
    discount: 0,
    outstanding: 0,
    payableAmount: 0,
  });

  return (
    <Container fluid className="py-2">
      <h4 className="mb-2 text-primary">Create Invoice</h4>
      <Alert variant="info" className="mb-2 py-1 small">
        Fill in the customer details, add invoice items, and review the totals before saving.
      </Alert>
      <Row className="g-2">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <CostumerDetails setCustomer={setCustomer} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <InvoiceDetails customer={customer} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm my-2">
        <Card.Body className="p-2">
          <ItemsForm setInvoiceItems={setInvoiceItems} setTotals={setTotals} />
        </Card.Body>
      </Card>

      <Row className="g-2">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <InvoiceTotals totals={totals} setTotals={setTotals} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <Action totals={totals} invoiceItems={invoiceItems} customer={customer} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateInvoice;
