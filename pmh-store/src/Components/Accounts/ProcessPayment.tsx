import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import axios from '../../Api/Api';
import { useKeyboardShortcuts, KEYBOARD_SHORTCUTS } from '../../utils/KeyboardHandler';

function ProcessPayment({ 
  customer, 
  setShowModal, 
  onPaymentComplete 
}: { 
  customer: any; 
  setShowModal: (show: boolean) => void;
  onPaymentComplete: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: 0,
      paymentMethod: 'Cash',
    },
  });

  const amount = watch('amount');
  

  useEffect(() => {
    if (customer?.accountHEad?.accountBalance) {
      setValue('amount', customer.accountHEad.accountBalance);
    }
  }, [customer, setValue]);

  const onSubmit = async (data: { amount: number; paymentMethod: string }) => {
    try {
      await axios.post('/accounts/collection', {
        customerId: customer._id,
        amount: data.amount,
        method: data.paymentMethod,
      });
      
      reset();
      onPaymentComplete();
      
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const handleCancel = () => {
    reset({
      amount: 0,
      paymentMethod: 'Cash'
    });
    setShowModal(false);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useKeyboardShortcuts([
    {
      key: KEYBOARD_SHORTCUTS.SAVE,
      handler: () => {
        if (!isSubmitting) {
          handleSubmit(onSubmit)();
        }
      }
    },
    {
      key: KEYBOARD_SHORTCUTS.CANCEL,
      handler: handleCancel
    }
  ]);

  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4 d-flex align-items-center">
          <BsFillPersonFill className="me-2" />
          Process Payment
        </Card.Title>

        <Row className="mb-3">
          <Col>
            <strong>Customer Name:</strong> {customer?.firstName || 'N/A'}
          </Col>
          <Col>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <strong>Outstanding Amount:</strong> {customer?.accountHEad?.accountBalance || 0}
          </Col>
          <Col>
            <strong>Payable Amount:</strong> ${amount > 0 ? amount : 'Enter amount'}
          </Col>
        </Row>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Payment Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              {...register('amount', {
                required: 'Amount is required',
                min: { value: 1, message: 'Amount must be at least 1' },
              })}
            />
            {errors.amount && (
              <div className="text-danger mt-1">{errors.amount.message}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPaymentMethod">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select
              {...register('paymentMethod', {
                required: 'Payment method is required',
              })}
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
            </Form.Select>
            {errors.paymentMethod && (
              <div className="text-danger mt-1">{errors.paymentMethod.message}</div>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button 
              variant="secondary" 
              onClick={handleCancel} 
              className="me-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isSubmitting || !customer?._id}
            >
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProcessPayment;
