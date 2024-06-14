import { Button, Col, Form, Row } from "react-bootstrap";
import "./accounts.scss";
const Action: React.FC = () => {
  return (
    <>
      <Form>
        <Col className="inv-cards">
          <Row>
            <Col>
              <Row className="mt-4">
                <Col>
                  <Row>
                    <Col>
                      <h5 style={{ color: "Blue" }}>Amount Payed</h5>
                    </Col>
                    <Col>
                      <Form.Group controlId="validationCustom01">
                        <Form.Control
                          required
                          type="text"
                          placeholder="First name"
                          defaultValue="INV001"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3"> 
            <Col>
              <Button className="col-md-12" variant="secondary">
                Cancel
              </Button>
            </Col>
            <Col>
              <Button className="col-md-12" variant="success">
                Save Invoice
              </Button>
            </Col>
            <Col>
              <Button className="col-md-12">Print Invoice</Button>
            </Col>
          </Row>
        </Col>
      </Form>
    </>
  );
};
export default Action;
