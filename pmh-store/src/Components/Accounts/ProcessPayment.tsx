import { useEffect, useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import axios from '../../Api/Api';

function ProcessPayment({ customer }:any) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePayment = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/payment', {
        customerId: customer.id,
        amount: amount,
      });
      setSuccess(`Payment successful: Transaction ID ${response.data.transactionId}`);
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    setAmount(customer.accountBallance)
  },[customer])

  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4 d-flex align-items-center">
          <BsFillPersonFill className="me-2" />
          Process Payment
        </Card.Title>

        <Row className="mb-3">
          <Col>
            <strong>Customer Name:</strong> {customer.firstName}
          </Col>
          <Col>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col>
            <strong>Outstanding Amount:</strong> {customer.accountBallance}
          </Col>
          <Col>
            {/* <strong>Payable Amount:</strong> ${amount > 0 ? amount : 'Enter amount'} */}
          </Col>
        </Row>

        <Form onSubmit={handlePayment}>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Payment Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="0"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loading} className="w-100">
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
      </Card.Body>
    </Card>
  );
}

export default ProcessPayment;
