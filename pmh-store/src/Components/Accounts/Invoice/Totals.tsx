import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaMoneyBillWave, FaPercentage, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const InvoiceTotals: React.FC<any> = ({ totals, setTotals }) => {
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discount = parseFloat(e.target.value) || 0;
    setTotals((prevTotals: any) => ({
      ...prevTotals,
      discount,
      payableAmount: prevTotals.billAmount - discount
    }));
  };

  return (
    <Form>
      <h4 className="mb-3 text-primary">Invoice Totals</h4>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label>Bill Amount</Form.Label>
        </Col>
        <Col xs={6}>
          <InputGroup>
            <InputGroup.Text><FaMoneyBillWave /></InputGroup.Text>
            <Form.Control
              size="sm"
              type="text"
              value={totals.billAmount.toFixed(2)}
              readOnly
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label>Discount</Form.Label>
        </Col>
        <Col xs={6}>
          <InputGroup>
            <InputGroup.Text><FaPercentage /></InputGroup.Text>
            <Form.Control
              size="sm"
              type="number"
              value={totals.discount}
              onChange={handleDiscountChange}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label className="text-danger">Outstanding</Form.Label>
        </Col>
        <Col xs={6}>
          <InputGroup>
            <InputGroup.Text><FaExclamationTriangle /></InputGroup.Text>
            <Form.Control
              size="sm"
              type="text"
              value={totals.outstanding.toFixed(2)}
              readOnly
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Label className="text-primary">Payable Amount</Form.Label>
        </Col>
        <Col xs={6}>
          <InputGroup>
            <InputGroup.Text><FaCheckCircle /></InputGroup.Text>
            <Form.Control
              size="sm"
              type="text"
              value={totals.payableAmount.toFixed(2)}
              readOnly
            />
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceTotals;
