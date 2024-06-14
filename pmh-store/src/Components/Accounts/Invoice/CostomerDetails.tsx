import { Col, Form, Row } from "react-bootstrap";
import './accounts.scss'
const CostumerDetails: React.FC = () => {
  return (
    <>
      <Form>
        <Col className="inv-cards">
          <h4 className="invoice-heads">Invoice To</h4>
          <Row>
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue="Mark"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue="Mark"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Form.Group controlId="validationCustom01">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" placeholder="Leave a comment here" />
            </Form.Group>
          </Row>
        </Col>
      </Form>
    </>
  );
};
export default CostumerDetails;
