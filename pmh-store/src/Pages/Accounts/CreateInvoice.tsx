import React, { useState, useEffect, useRef } from "react";
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
  const [invoiceDetails,setInvoiceDetails]=useState()

  // Add refs before the useForm hook
  const customerDetailsRef = useRef<any>(null);
  const invoiceDetailsRef = useRef<any>(null);

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
    // Auto-focus on the quick add item input when the component mounts
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

  const handleInvoiceCancel = () => {
    // Reset all states to initial values
    setCustomer({});
    setTotals({
      billAmount: 0,
      discount: 0,
      outstanding: 0,
      payableAmount: 0,
    });
    setTotal(0);
    setInvoiceDetails(undefined);
    
    // Reset form data including items
    reset({
      items: []
    });

    // Reset customer details
    if (customerDetailsRef.current) {
      customerDetailsRef.current.resetCustomer();
    }

    // Generate new invoice number
    if (invoiceDetailsRef.current) {
      invoiceDetailsRef.current.generateNewInvoiceNumber();
    }
  };

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
              <InvoiceItemAutoComplete onItemSelect={handleQuickAdd} />
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
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <CustomerDetails 
                ref={customerDetailsRef}
                setCustomer={setCustomer} 
              />
            </Card.Body>
          </Card>
          <Card className="shadow-sm mb-2">
            <Card.Body className="p-2">
              <InvoiceDetails 
                ref={invoiceDetailsRef}
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
                onCancel={handleInvoiceCancel}
                onPaymentComplete={handleInvoiceCancel}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateInvoice;
