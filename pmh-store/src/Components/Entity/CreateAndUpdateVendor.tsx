import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import { FaSave, FaTimes } from "react-icons/fa";

interface Vendor {
  _id: string;
  name: string;
  contactPhone: string;
  contactEmail: string;
  accountHead: string;
  accountBallance: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CreateAndUpdateVendorProps {
  handleClose: () => void;
  vendorToEdit?: Vendor | null;
}

// Define allowed fields based on vendorValidation schema
const allowedFields: Array<keyof Vendor> = [
  "name",
  "contactEmail",
  "contactPhone",
  "street",
  "city",
  "state",
  "zipCode",
  "country",
  "accountBallance",
];

const filterVendorData = (data: Vendor): Partial<Vendor> => {
  return Object.keys(data).reduce((acc, key) => {
    // Use a type assertion to ensure key is a valid key of Vendor
    if (allowedFields.includes(key as keyof Vendor)) {
      acc[key as keyof Partial<Vendor>] = data[key as keyof Vendor] as any; // Use 'as any' to bypass type checking
    }
    return acc;
  }, {} as Partial<Vendor>);
};


const CreateAndUpdateVendor: React.FC<CreateAndUpdateVendorProps> = ({ handleClose, vendorToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Vendor>();
  const { setLoadingState } = useLoading();

  useEffect(() => {
    if (vendorToEdit) {
      reset(vendorToEdit);
    }
  }, [vendorToEdit, reset]);

  const onSubmit: SubmitHandler<Vendor> = async (data: Vendor) => {
    try {
      setLoadingState(true);
      const filteredData = filterVendorData(data);
      if (vendorToEdit) {
        await axios.patch(`entity/vendor/${vendorToEdit._id}`, filteredData);
      } else {
        await axios.post("entity/vendor", filteredData);
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
              {...register("name", { required: "Name is required" })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formVendorPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone number"
              {...register("contactPhone", { 
                required: "Phone number is required",
                valueAsNumber: true,
              })}
              isInvalid={!!errors.contactPhone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contactPhone?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="formVendorEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("contactEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              isInvalid={!!errors.contactEmail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contactEmail?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
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
          <FaSave /> {vendorToEdit ? 'Update' : 'Save'} Vendor
        </Button>
      </div>
    </Form>
  );
};

export default CreateAndUpdateVendor;
