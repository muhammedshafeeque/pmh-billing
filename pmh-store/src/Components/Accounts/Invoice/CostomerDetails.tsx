import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import AutoComplete from "../../AutoComplete/AutoComplete";
import axios from "../../../Api/Api";
import { useLoading } from "../../../Contexts/LoaderContext";

const CostumerDetails: React.FC<any> = ({ setCustomer }) => {
  const { setLoadingState } = useLoading();
  const { control, handleSubmit, register, errors, setValue, watch }: any = useForm({
    defaultValues: {
      customerName: "",
      mobile: "",
      address: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (data.customerName._id) {
      setCustomer(data)
    } else if (data.customerName && data.mobile) {
      try {
        setLoadingState(true);
        let body = {
          firstName: data.customerName,
          phone: data.mobile,
          address: data.address,
        };
       let customer=await axios.post("entity/create-customer-from-invoice", body);
       setCustomer(customer.data)
      } catch (error) {
      } finally {
        setLoadingState(false);
      }
    }
  };

  return (
    <Form onBlur={handleSubmit(onSubmit)}>
      <h6 className="mb-2 text-primary">Customer Details</h6>
      <Row className="g-1">
        <Col md={6}>
          <Form.Group controlId="customerName" className="mb-1">
            <Form.Label className="small">Customer Name</Form.Label>
            <InputGroup size="sm">
              <InputGroup.Text><FaUser /></InputGroup.Text>
              <AutoComplete
                register={register}
                errors={errors}
                name="customerName"
                setValue={setValue}
                readField={"firstName"}
                url={`/entity/customer?firstNameContains`}
                isRequired={true}
                editable={true}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="mobile" className="mb-1">
            <Form.Label className="small">Mobile</Form.Label>
            <InputGroup size="sm">
              <InputGroup.Text><FaPhone /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter mobile"
                {...register("mobile", { required: "Mobile is required" })}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="address" className="mb-1">
        <Form.Label className="small">Address</Form.Label>
        <InputGroup size="sm">
          <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Enter address"
                {...field}
              />
            )}
          />
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default CostumerDetails;
