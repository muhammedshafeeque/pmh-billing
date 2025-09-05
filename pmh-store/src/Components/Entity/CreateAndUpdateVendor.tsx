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
  accountHEad: string;
  accountBallance: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CreateAndUpdateVendorProps extends PopupChildeProp {
  vendorToEdit?: Vendor | null;
}

// Define allowed fields based on vendorValidation schema
const allowedFields = [
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
  const filtered: Partial<Vendor> = {};
  
  if (data.name) filtered.name = data.name;
  if (data.contactEmail) filtered.contactEmail = data.contactEmail;
  if (data.contactPhone) filtered.contactPhone = data.contactPhone;
  if (data.street) filtered.street = data.street;
  if (data.city) filtered.city = data.city;
  if (data.state) filtered.state = data.state;
  if (data.zipCode) filtered.zipCode = data.zipCode;
  if (data.country) filtered.country = data.country;
  if (data.accountBallance !== undefined) filtered.accountBallance = data.accountBallance;
  
  return filtered;
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

      <Row className="mt-3">
        <Col md={12}>
          <Form.Group controlId="formVendorStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street address"
              {...register("street")}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="formVendorCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              {...register("city")}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formVendorState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              {...register("state")}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="formVendorZipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter zip code"
              {...register("zipCode", { 
                valueAsNumber: true,
              })}
              isInvalid={!!errors.zipCode}
            />
            <Form.Control.Feedback type="invalid">
              {errors.zipCode?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formVendorCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              {...register("country")}
            />
          </Form.Group>
        </Col>
      </Row>

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
