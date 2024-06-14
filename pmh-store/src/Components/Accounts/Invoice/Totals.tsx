import { Col, Form, Row } from "react-bootstrap";

const InvoiceTotals: React.FC = () => {
  return (
    <>
      <Form>
        <Col className="inv-cards">
          <Row className="mt-4">
            <Col>
              <Row>
                <Col>
                  <h4>Bill Amount</h4>
                </Col>
                <Col>
                  <Form.Group controlId="validationCustom01">
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      defaultValue="INV001"
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Row>
                <Col>
                  <h5>Discount</h5>
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
          <Row className="mt-4">
            <Col>
              <Row>
                <Col>
                  <h5 style={{ color: "red" }}>Outstanding</h5>
                </Col>
                <Col>
                  <Form.Group controlId="validationCustom01">
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      defaultValue="INV001"
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Row>
                <Col>
                  <h5 style={{ color: "Blue" }}>Payable Amount</h5>
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
      </Form>
    </>
  );
};
export default InvoiceTotals;
