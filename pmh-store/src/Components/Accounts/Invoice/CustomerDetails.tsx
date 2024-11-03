import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import AutoComplete from "../../AutoComplete/AutoComplete";
import { useForm } from "react-hook-form";
import axios  from "../../../Api/Api";

const CustomerDetails: React.FC<{ setCustomer: (customer: any) => void }> = ({
  setCustomer,
}) => {
  const { register, errors, setValue,  getValues,watch }: any =
    useForm({
      defaultValues: {
        name: "",
        phone: "",
        address: "",
      },
    });
    const [isNew,setIsNew]=useState(false)
  const handleLookup = () => {
    // Implement customer lookup logic here
    // On successful lookup, call setCustomer with the customer data
  };

  const handleCreateCustomer = async() => {
    const values = getValues(); // Get all form values
   let customer= await axios.post('/entity/create-customer-from-invoice',values)
   setCustomer(customer)
   setValue('name',customer),
   setValue('phone',customer)
  };
  useEffect(()=>{
    if(watch('name')._id){
      setIsNew(false)
    }else{
      
      setIsNew(true)
    }
  },[watch('name')])
  return (
    <div>
      <h5>Customer Details</h5>
      <Form.Group className="mb-2">
        <AutoComplete
          register={register}
          errors={errors}
          name="name"
          setValue={(name, value) => {
            setValue(name, value);
          }}
          readField={"firstName"}
          url={`/entity/customer?firstNameContains`}
          isRequired={false}
          editable={true}
          label="Name"
          
          onSelect={(e) => {
            setValue(`phone`, e);
            setCustomer(e)
          }}
          value={watch(`name`)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <AutoComplete
          register={register}
          errors={errors}
          name="phone"
          setValue={(name, value) => {
            setValue(name, value);
          }}
          readField={"phone"}
          url={`/entity/customer?phoneContains`}
          isRequired={false}
          editable={true}
          label="Phone Number"
          onSelect={(e: any) => {
            setValue("name", e);
            setCustomer(e)
          }}
          value={watch(`phone`)}
        />
      </Form.Group>
      
      <Button variant="outline-primary" size="sm" onClick={handleLookup}>
        Lookup Customer (F3)
      </Button>
      {isNew && (
        <Button
          variant="outline-success"
          className="ml-2"
          size="sm"
          onClick={handleCreateCustomer}
        >
          Create Customer
        </Button>
      )}
      
    </div>
  );
};

export default CustomerDetails;
