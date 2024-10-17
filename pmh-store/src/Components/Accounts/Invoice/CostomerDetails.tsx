import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Col, Form, Row } from "react-bootstrap";
import "./accounts.scss";
import AutoComplete from "../../AutoComplete/AutoComplete";
import axios from "../../../Api/Api";
import { useLoading } from "../../../Contexts/LoaderContext";
const CostumerDetails: React.FC <any>= ({setCustomer}) => {
  const { setLoadingState } = useLoading();
  const { control, handleSubmit, register, errors, setValue,watch }: any = useForm({
    defaultValues: {
      customerName: "",
      mobile: "",
      address: "",
    },
  });


  const onSubmit = async(data: any) => {
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
  const customer=watch('customerName')
  useEffect(() => {
    setValue('mobile',customer.phone)
  }, [customer]);
  return (
    <Form onBlur={handleSubmit(onSubmit)}>
      <Col className="inv-cards">
        <h4 className="invoice-heads">Invoice To</h4>
        <Row>
          <Col>
            <Form.Group controlId="customerName">
              <AutoComplete
                register={register}
                errors={errors}
                name="customerName"
                label="Customer Name"
                setValue={setValue}
                readField={"firstName"}
                url={`/entity/customer?firstNameContains`}
                isRequired={true}
                editable={true}
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="customerName">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile"
              {...register("mobile", { required: "mobile is required" })}
            />
            
              {/* <AutoComplete
                register={register}
                errors={errors}
                name="mobile"
                label="Mobile"
                setValue={setValue}
                readField={"phone"}
                url={`/entity/customer?phoneContains`}
                isRequired={true}
                editable={true}
              /> */}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>

              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    size="sm"
                    as="textarea"
                    placeholder="Leave a comment here"
                    {...field}
                  />
                )}
              />
            </Form.Group>
          </Col>
        </Row>
      </Col>
    </Form>
  );
};

export default CostumerDetails;
