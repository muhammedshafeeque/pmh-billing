import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./accounts.scss";
import { Button } from "react-bootstrap";
const InvoiceDetails: React.FC = () => {
  return (
    <>
      <Form>
        <div className="inv-cards">
          <h4 className="invoice-heads">Invoice Details</h4>
          <Row className="mt-4">
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Invoice Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue="INV001"
                  disabled
                />
                <Form.Control.Feedback>Mobile</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>DATE</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="First name"
                  defaultValue="Mark"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Outstanding Amount</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue="INV001"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col className="mt-4 pt-2">
              <Button className="col-md-12">View History</Button>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};
export default InvoiceDetails;
