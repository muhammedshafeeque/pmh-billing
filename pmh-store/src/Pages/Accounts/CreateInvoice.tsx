import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import CustomerDetails from "../../Components/Accounts/Invoice/CustomerDetails";
import InvoiceDetails from "../../Components/Accounts/Invoice/InvoiceDetails";
import InvoiceTotals from "../../Components/Accounts/Invoice/Totals";
import Action from "../../Components/Accounts/Invoice/Actions";
import InvoiceItemAutoComplete from "../../Components/Accounts/Invoice/InvoiceItemAutoComplete";
import Items from "../../Components/Accounts/Invoice/Items";

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

const CreateInvoice: React.FC = () => {
  const [customer, setCustomer] = useState<any>({});
  const [totals, setTotals] = useState({
    billAmount: 0,
    discount: 0,
    outstanding: 0,
    payableAmount: 0,
  });
  const [total, setTotal] = useState(0);
  const [invoiceDetails, setInvoiceDetails] = useState();
  const [isInvoiceGenerated, setIsInvoiceGenerated] = useState(false);
  const [invoiceKey, setInvoiceKey] = useState(0); // Key to force re-mount InvoiceDetails
  const { control, register, watch, getValues, reset } = useForm<InvoiceForm>({
    defaultValues: {
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");

  useEffect(() => {
    const quickAddInput = document.getElementById("itemSearch");
    if (quickAddInput) {
      quickAddInput.focus();
    }
  }, []);

  const handleQuickAdd = (selectedItem: InvoiceItem) => {
    if (selectedItem) {
      append({
        ...selectedItem,
        quantity: 1,
      });
    }
  };

  const handleTotalChange = (newTotal: number) => {
    setTotal(newTotal);
  };

  const handleInvoiceGenerated = (invoiceData: any) => {
    setIsInvoiceGenerated(true);
    // Store invoice data if needed for future use
    console.log('Invoice generated:', invoiceData);
  };

  const handleNewInvoice = () => {
    console.log("🔄 Starting New Invoice - Clearing ALL data...");
    
    // Reset form and all items
    reset({ items: [] });
    
    // Clear customer data completely
    setCustomer({});
    
    // Reset all totals to zero
    setTotals({
      billAmount: 0,
      discount: 0,
      outstanding: 0,
      payableAmount: 0,
    });
    
    // Reset total amount
    setTotal(0);
    
    // Clear invoice details
    setInvoiceDetails(undefined);
    
    // Reset invoice generation state
    setIsInvoiceGenerated(false);
    
    // Force re-mount InvoiceDetails to get new invoice number
    setInvoiceKey(prev => prev + 1);
    
    console.log("✅ All invoice data cleared successfully");
    
    // Focus on item search after clearing
    setTimeout(() => {
      const quickAddInput = document.getElementById("itemSearch") as HTMLInputElement;
      if (quickAddInput) {
        quickAddInput.focus();
        quickAddInput.value = ""; // Clear any existing value
      }
    }, 200);
  };
  useEffect(()=>{
    const newTotals = watchItems.reduce(
      (acc) => {
        acc.billAmount = total;
        acc.payableAmount = total;
        return acc;
      },
      { billAmount: 0, discount: 0, outstanding: 0, payableAmount: 0 }
    );
   setTotals(newTotals)
  },[total])

  return (
    <Container fluid className="py-2">
      <h4 className="mb-2 text-primary">Billing</h4>
      <Alert variant="info" className="mb-2 py-1 small">
        Scan items or enter details below. Press F2 for payment, F3 for customer lookup.
      </Alert>
      <Row className="g-2">
        <Col md={8}>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <InvoiceItemAutoComplete 
                key={`items-${invoiceKey}`}
                onItemSelect={handleQuickAdd} 
                disabled={isInvoiceGenerated}
              />
            </Card.Body>
          </Card>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <Items
                fields={fields}
                register={register}
                control={control}
                remove={remove}
                onTotalChange={handleTotalChange}
                disabled={isInvoiceGenerated}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <CustomerDetails 
                key={`customer-${invoiceKey}`}
                setCustomer={setCustomer} 
                disabled={isInvoiceGenerated}
              />
            </Card.Body>
          </Card>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <InvoiceDetails 
                key={invoiceKey} 
                customer={customer} 
                setInvoiceDetails={setInvoiceDetails} 
              />
            </Card.Body>
          </Card>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <InvoiceTotals totals={totals} setTotals={setTotals} customer={customer} />
            </Card.Body>
          </Card>
          <Card className="shadow-sm">
            <Card.Body className="p-2">
              <Action 
                totals={totals} 
                invoiceItems={getValues()} 
                customer={customer} 
                invoiceDetails={invoiceDetails} 
                onNewInvoice={handleNewInvoice}
                onInvoiceGenerated={handleInvoiceGenerated}
                isInvoiceGenerated={isInvoiceGenerated}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateInvoice;
