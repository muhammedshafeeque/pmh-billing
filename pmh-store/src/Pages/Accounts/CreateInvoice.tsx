import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Form } from "react-bootstrap";
import CustomerDetails from "../../Components/Accounts/Invoice/CustomerDetails";
import InvoiceDetails from "../../Components/Accounts/Invoice/InvoiceDetails";
import ItemsForm from "../../Components/Accounts/Invoice/Items";
import InvoiceTotals from "../../Components/Accounts/Invoice/Totals";
import Action from "../../Components/Accounts/Invoice/Actions";

const CreateInvoice: React.FC = () => {
  const [customer, setCustomer] = useState<any>({});
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    billAmount: 0,
    discount: 0,
    outstanding: 0,
    payableAmount: 0,
  });
  const [quickAddItem, setQuickAddItem] = useState("");

  useEffect(() => {
    // Auto-focus on the quick add item input when the component mounts
    const quickAddInput = document.getElementById("quickAddItem");
    if (quickAddInput) {
      quickAddInput.focus();
    }
  }, []);

  const handleQuickAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && quickAddItem.trim() !== "") {
      // Add logic to quickly add an item by barcode or name
      // This should integrate with your existing ItemsForm component
      setQuickAddItem("");
    }
  };

  return (
    <Container fluid className="py-2">
      <h4 className="mb-2 text-primary">Supermarket Billing</h4>
      <Alert variant="info" className="mb-2 py-1 small">
        Scan items or enter details below. Press F2 for payment, F3 for customer lookup.
      </Alert>
      <Row className="g-2">
        <Col md={8}>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <Form.Control
                id="quickAddItem"
                type="text"
                placeholder="Scan barcode or enter item name"
                value={quickAddItem}
                onChange={(e) => setQuickAddItem(e.target.value)}
                onKeyPress={handleQuickAdd}
              />
            </Card.Body>
          </Card>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <ItemsForm setInvoiceItems={setInvoiceItems} setTotals={setTotals} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <CustomerDetails setCustomer={setCustomer} />
            </Card.Body>
          </Card>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <InvoiceDetails customer={customer} />
            </Card.Body>
          </Card>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <InvoiceTotals totals={totals} setTotals={setTotals} />
            </Card.Body>
          </Card>
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
