import { Row, Col, Form, Button } from "react-bootstrap";
import axios from '../../../Api/Api';
import { useEffect, useState } from "react";
import moment from "moment";
import "./accounts.scss";

const InvoiceDetails: React.FC = () => {
  const [prefix, setPrefix] = useState<any>({ name: "" });
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    // Initialize date in DD/MM/YYYY format
    const formattedDate = moment().format("DD/MM/YYYY");
    setDate(formattedDate);

    const fetchData = async () => {
      try {
        const res = await axios.post('core/generate-sequence', { type: '/INV/' });
        setPrefix(res.data);
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
  };

  return (
    <>
      <Form>
        <div className="inv-cards">
          <h4 className="invoice-heads">Invoice Details</h4>
          <Row className="mt-1">
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Invoice Number</Form.Label>
                <Form.Control
                  required
                  size="sm"
                  type="text"
                  placeholder="Invoice Number"
                  value={prefix?.name || ""}
                  disabled
                />
                <Form.Control.Feedback>Mobile</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>DATE</Form.Label>
                {/* Use a text input for displaying the date in DD/MM/YYYY format */}
                <Form.Control
                  required
                  type="text"
                  size="sm"
                  placeholder="Invoice Date"
                  value={date}
                  onChange={handleDateChange}
                  pattern="\d{2}/\d{2}/\d{4}" // Regex pattern for DD/MM/YYYY format
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Outstanding Amount</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Outstanding Amount"
                  defaultValue="INV001"
                  disabled
                  size="sm"
                />
              </Form.Group>
            </Col>
            <Col className="mt-4 pt-2">
              <Button size="sm" className="col-md-12">
                View History
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default InvoiceDetails;
