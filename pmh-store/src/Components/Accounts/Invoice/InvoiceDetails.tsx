import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaCalendarAlt, FaFileInvoice, FaHistory } from "react-icons/fa";
import axios from '../../../Api/Api';
import moment from "moment";
import "./accounts.scss";

const InvoiceDetails: React.FC<any> = ({ customer ,setInvoiceDetails}) => {
  const [prefix, setPrefix] = useState<any>({ name: "" });
  const [date, setDate] = useState<string>( moment().format("DD/MM/YYYY"));
  const [outAmount, setOutAmount] = useState<number>(0);

  useEffect(() => {
    const formattedDate = moment().format("DD/MM/YYYY");
    setDate(formattedDate);
    const fetchData = async () => {
      try {
        const res = await axios.post('core/generate-sequence', { type: '/INV/' });
        setPrefix(res.data);
        setInvoiceDetails({prefix:res.data,formattedDate})
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const formattedDate = moment(inputDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    setDate(formattedDate);
    setInvoiceDetails({prefix,formattedDate})
  };
  useEffect(()=>{
    if(customer&&customer.accountBallance){
      setOutAmount(customer.accountBallance)
    }else{
      setOutAmount(0)
    }
  },[customer])

  return (
    <>
      <h6 className="mb-2 text-primary">Invoice Details</h6>
      <Form>
        <Row className="g-1">
          <Col md={6}>
            <Form.Group controlId="invoiceNumber" className="mb-1">
              <Form.Label className="small">Invoice Number</Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text><FaFileInvoice /></InputGroup.Text>
                <Form.Control
                  type="text"
                  value={prefix?.name || ""}
                  disabled
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="invoiceDate" className="mb-1">
              <Form.Label className="small">Date</Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                <Form.Control
                  type="text"
                  value={date}
                  onChange={handleDateChange}
                  pattern="\d{2}/\d{2}/\d{4}"
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-1">
          <Col md={6}>
            <Form.Group controlId="outstandingAmount" className="mb-1">
              <Form.Label className="small">Outstanding Amount</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={outAmount}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6} className="d-flex align-items-end">
            <Button variant="outline-primary" size="sm" className="w-100 py-1">
              <FaHistory className="me-1" />
              View History
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default InvoiceDetails;
