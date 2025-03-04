import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AutoComplete from '../AutoComplete/AutoComplete';
import { useLoading } from '../../Contexts/LoaderContext';
import axios from '../../Api/Api';

interface CreateCollectionProps {
  handleClose: () => void;
}

const CreateCollection: React.FC<CreateCollectionProps> = ({ handleClose }) => {
  const { setLoadingState } = useLoading();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoadingState(true);
      const payload = {
        invoice: data.invoice._id,
        amount: data.amount,
        paymentMode: data.paymentMode,
        reference: data.reference,
      };
      await axios.post('accounts/collection', payload);
      handleClose();
    } catch (error) {
      console.error('Error creating collection:', error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <AutoComplete
          register={register}
          errors={errors}
          name="invoice"
          label="Invoice Number"
          setValue={setValue}
          readField={"number"}
          url={`accounts/invoice?numberContains`}
          rules={{ required: 'Invoice is required' }}
        />
        {errors.invoice && (
          <Form.Text className="text-danger">
            {errors.invoice.message as string}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          {...register('amount', { required: 'Amount is required' })}
        />
        {errors.amount && (
          <Form.Text className="text-danger">
            {errors.amount.message as string}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Payment Mode</Form.Label>
        <Form.Select {...register('paymentMode', { required: 'Payment mode is required' })}>
          <option value="">Select Payment Mode</option>
          <option value="CASH">Cash</option>
          <option value="UPI">UPI</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
          <option value="CHEQUE">Cheque</option>
        </Form.Select>
        {errors.paymentMode && (
          <Form.Text className="text-danger">
            {errors.paymentMode.message as string}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Reference</Form.Label>
        <Form.Control
          type="text"
          {...register('reference')}
          placeholder="Transaction ID/Cheque No/UPI Reference"
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Create Collection
        </Button>
      </div>
    </Form>
  );
};

export default CreateCollection; 