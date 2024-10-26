import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AutoComplete from "../../AutoComplete/AutoComplete";
import { useForm } from "react-hook-form";

const CustomerDetails: React.FC<{ setCustomer: (customer: any) => void }> = ({
  setCustomer,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState(""); // New state for name input

  const { control, handleSubmit, register, errors, setValue, watch }: any =
    useForm({
      defaultValues: {
        customerName: "",
        mobile: "",
        address: "",
      },
    });

  const handleLookup = () => {
    // Implement customer lookup logic here
    // On successful lookup, call setCustomer with the customer data
  };

  const handleCreateCustomer = () => {
    // Implement customer creation logic here
    // Gather data from the form and send it to the backend
  };

  return (
    <div>
      <h5>Customer Details</h5>
      <Form.Group className="mb-2">
      <AutoComplete
          register={register}
          errors={errors}
          name="phone"
          setValue={setValue}
          readField={"phone"}
          url={`/entity/customer?phoneContains`}
          isRequired={false}
          editable={true}
          label="Phone Number"
          onSelect={(e:any)=>{
            setValue('name',e)
          }}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <AutoComplete
          register={register}
          errors={errors}
          name="name"
          setValue={setValue}
          readField={"firstName"}
          url={`/entity/customer?firstNameContains`}
          isRequired={false}
          editable={true}
          label="Name"
          onSelect={(e:any)=>{
            setValue('phone',e)
          }}
        />
      </Form.Group>
      <Button variant="outline-primary" size="sm" onClick={handleLookup}>
        Lookup Customer (F3)
      </Button>
      <Button variant="outline-success" size="sm" onClick={handleCreateCustomer}>
        Create Customer
      </Button>
    </div>
  );
};

export default CustomerDetails;
