import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useLoading } from "../../Contexts/LoaderContext";
import { FaSave, FaTimes } from "react-icons/fa";
import { createCustomer, updateCustomer } from "../../Services/api/EntityApi";

interface Customer {
  _id: string;
  firstName: string;
  phone: string;
  contactEmail: string;
  accountHEad: any;
  accountBallance: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CreateAndUpdateCustomerProps {
  handleClose: () => void;
  customerToEdit?: Customer | null;
}

// Define allowed fields based on vendorValidation schema
const allowedFields: Array<keyof Customer> = [
  "firstName",
  "contactEmail",
  "phone",
  "street",
  "city",
  "state",
  "zipCode",
  "country",
  "accountBallance",
];

const filterVendorData = (data: Customer): Partial<Customer> => {
  return Object.keys(data).reduce((acc, key) => {
    // Use a type assertion to ensure key is a valid key of Vendor
    if (allowedFields.includes(key as keyof Customer)) {
      acc[key as keyof Partial<Vendor>] = data[key as keyof Customer] as any; // Use 'as any' to bypass type checking
    }
    return acc;
  }, {} as Partial<Vendor>);
};


const CreateAndUpdateCustomer: React.FC<CreateAndUpdateCustomerProps> = ({ handleClose, customerToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<Customer>();
  const { setLoadingState } = useLoading();

  useEffect(() => {
    if (customerToEdit) {
      reset(customerToEdit);
      setValue('accountBallance',customerToEdit.accountHEad.accountBalance)
    }
  }, [customerToEdit, reset]);

  const onSubmit: SubmitHandler<Customer> = async (data: Customer) => {
    try {
      setLoadingState(true);
      const filteredData = filterVendorData(data);
      if (customerToEdit) {
        await updateCustomer(filteredData,customerToEdit._id)
      } else {
        await createCustomer(filteredData)
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting vendor:", error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formVendorName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter vendor name"
              {...register("firstName", { required: "Name is required" })}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formVendorPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone number"
              {...register("phone", { 
                required: "Phone number is required",
                valueAsNumber: true,
              })}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
       
        <Col md={6}>
          <Form.Group controlId="formVendorOpeningBalance">
            <Form.Label>Opening Balance</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter opening balance"
              {...register("accountBallance", { valueAsNumber: true })}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* ...Other form fields... */}

      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          <FaTimes /> Cancel
        </Button>
        <Button variant="primary" type="submit">
          <FaSave /> {customerToEdit ? 'Update' : 'Save'} Customer
        </Button>
      </div>
    </Form>
  );
};

export default CreateAndUpdateCustomer;
