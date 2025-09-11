import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import { FaSave, FaTimes } from "react-icons/fa";

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  openingBalance?: number;
  accountHEad: string;
}

interface PopupChildeProp {
  handleClose: () => void;
}

interface CreateAndUpdateCustomerProps extends PopupChildeProp {
  customerToEdit?: Customer | null;
}

// Filter customer data to only include allowed fields

const filterCustomerData = (data: Customer, isUpdate: boolean = false): Partial<Customer> => {
  const filtered: Partial<Customer> = {};
  
  if (data.firstName) filtered.firstName = data.firstName;
  if (data.lastName) filtered.lastName = data.lastName;
  if (data.email) filtered.email = data.email;
  if (data.phone) filtered.phone = data.phone;
  // Only include opening balance for new customers, not updates
  if (!isUpdate && data.openingBalance !== undefined) filtered.openingBalance = data.openingBalance;
  if (data.address) filtered.address = data.address;
  
  return filtered;
};

const CreateAndUpdateCustomer: React.FC<CreateAndUpdateCustomerProps> = ({ 
  handleClose, 
  customerToEdit 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Customer>();
  const { setLoadingState } = useLoading();

  useEffect(() => {
    if (customerToEdit) {
      reset(customerToEdit);
    }
  }, [customerToEdit, reset]);

  const onSubmit: SubmitHandler<Customer> = async (data: Customer) => {
    try {
      setLoadingState(true);
      const isUpdate = !!customerToEdit;
      const filteredData = filterCustomerData(data, isUpdate);
      if (customerToEdit) {
        await axios.patch(`entity/customer/${customerToEdit._id}`, filteredData);
      } else {
        await axios.post("entity/customer", filteredData);
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting customer:", error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formCustomerFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              {...register("firstName", { required: "First name is required" })}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCustomerLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              {...register("lastName", { required: "Last name is required" })}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="formCustomerPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number (10 digits)"
              {...register("phone", { 
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please provide a valid 10-digit phone number"
                }
              })}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCustomerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please provide a valid email address",
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCustomerOpeningBalance">
            <Form.Label>Opening Balance</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter opening balance"
              {...register("openingBalance", { valueAsNumber: true })}
              disabled={!!customerToEdit}
              style={customerToEdit ? { backgroundColor: '#f8f9fa', cursor: 'not-allowed' } : {}}
            />
            {customerToEdit && (
              <Form.Text className="text-muted">
                Opening balance cannot be modified after customer creation
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={12}>
          <Form.Group controlId="formCustomerStreet">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street address"
              {...register("address.street")}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="formCustomerCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              {...register("address.city")}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCustomerState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              {...register("address.state")}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="formCustomerZipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter 5-digit zip code"
              {...register("address.zipCode", { 
                pattern: {
                  value: /^\d{5}$/,
                  message: "Please provide a valid 5-digit zip code"
                }
              })}
              isInvalid={!!errors.address?.zipCode}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.zipCode?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCustomerCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              {...register("address.country")}
            />
          </Form.Group>
        </Col>
      </Row>

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
