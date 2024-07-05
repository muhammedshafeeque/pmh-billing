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
                          size="sm"
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
              <Button className="col-md-12" variant="secondary" size="sm">
                Cancel
              </Button>
            </Col>
            <Col>
              <Button className="col-md-12" variant="success" size="sm">
                Save Invoice
              </Button>
            </Col>
            <Col>
              <Button className="col-md-12" size="sm">
                Print Invoice
              </Button>
            </Col>
          </Row>
        </Col>
      </Form>
    </>
  );
};
export default Action;
