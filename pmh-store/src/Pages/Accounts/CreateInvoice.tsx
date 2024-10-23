import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import CustomerDetails from "../../Components/Accounts/Invoice/CustomerDetails";
import InvoiceDetails from "../../Components/Accounts/Invoice/InvoiceDetails";
import ItemsForm from "../../Components/Accounts/Invoice/Items";
import InvoiceTotals from "../../Components/Accounts/Invoice/Totals";
import Action from "../../Components/Accounts/Invoice/Actions";
import InvoiceItemAutoComplete from "../../Components/Accounts/Invoice/InvoiceItemAutoComplete";

const CreateInvoice: React.FC = () => {
  const [customer, setCustomer] = useState<any>({});
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    billAmount: 0,
    discount: 0,
    outstanding: 0,
    payableAmount: 0,
  });

  useEffect(() => {
    // Auto-focus on the quick add item input when the component mounts
    const quickAddInput = document.getElementById("itemSearch");
    if (quickAddInput) {
      quickAddInput.focus();
    }
  }, []);

  const handleQuickAdd = (selectedItem: any) => {
    if (selectedItem) {
      console.log(selectedItem)
      const newItem = {
        ...selectedItem,
        quantity: 1, // Default quantity
        // Add any other necessary fields
      };
      setInvoiceItems([...invoiceItems, newItem]);
      
      // Update totals
      // This is a simplified calculation. Adjust according to your needs.
      setTotals(prevTotals => ({
        ...prevTotals,
        billAmount: prevTotals.billAmount + selectedItem.price,
        payableAmount: prevTotals.payableAmount + selectedItem.price,
      }));
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
              <InvoiceItemAutoComplete onItemSelect={handleQuickAdd} />
            </Card.Body>
          </Card>
          <Card className="shadow-sm ">
            <Card.Body className="p-2">
              <ItemsForm invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} setTotals={setTotals} />
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
