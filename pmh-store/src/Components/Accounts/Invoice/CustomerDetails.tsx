import  { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Form, Button } from "react-bootstrap";
import AutoComplete from "../../AutoComplete/AutoComplete";
import { useForm } from "react-hook-form";
import axios from "../../../Api/Api";
import { useKeyboardShortcuts, KEYBOARD_SHORTCUTS } from '../../../Utils/KeyboardHandler';

interface CustomerDetailsProps {
  setCustomer: (customer: any) => void;
}

interface Customer {
  _id: string;
  firstName: string;
  phone: string;
  accountBallance?: number;
}

const CustomerDetails = forwardRef<any, CustomerDetailsProps>(({ setCustomer }, ref) => {
  const { register, formState: { errors }, setValue, getValues, watch, reset } = useForm<{
    name: string | Customer;
    phone: string | Customer;
    address: string;
  }>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });
  const [isNew, setIsNew] = useState(false);
  const [clearName, setClearName] = useState(false);
  const [clearPhone, setClearPhone] = useState(false);

  useImperativeHandle(ref, () => ({
    resetCustomer: () => {
      // Reset form values
      reset({
        name: "",
        phone: "",
        address: "",
      });
      
      // Reset parent state
      setCustomer({});
      
      // Reset local states
      setIsNew(false);
      
      // Toggle clear flags to reset AutoComplete components
      setClearName(prev => !prev);
      setClearPhone(prev => !prev);
      
      // Reset AutoComplete values explicitly
      setValue('name', '');
      setValue('phone', '');
    }
  }));

  const handleLookup = () => {
    // Implement customer lookup logic here
    // On successful lookup, call setCustomer with the customer data
  };

  const handleCreateCustomer = async() => {
    const values = getValues(); // Get all form values
   let customer= await axios.post('/entity/create-customer-from-invoice',values)
   setCustomer(customer.data.response)
   setValue('name',customer.data.response),
   setValue('phone',customer.data.response)
  };
  useEffect(() => {
    const nameValue = watch('name');
    if (typeof nameValue === 'object' && 'firstName' in nameValue) {
      setIsNew(false);
    } else {
      setIsNew(true);
    }
  }, [watch('name')]);

  useKeyboardShortcuts([
    {
      key: KEYBOARD_SHORTCUTS.CUSTOMER_LOOKUP,
      handler: handleLookup
    },
    {
      key: 'Enter',
      handler: () => {
        if (isNew) {
          handleCreateCustomer();
        }
      }
    }
  ]);

  return (
    <div>
      <h5>Customer Details</h5>
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
          clear={clearName}
          onSelect={(e) => {
            setValue(`phone`, e);
            setCustomer(e)
          }}
          value={watch(`name`)}
          onChange={()=>{
            let phone =getValues('phone')
            if(typeof phone ==='object'){
              setClearPhone(!clearPhone)
            }
          }}
        />
      </Form.Group>
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
          clear={clearPhone}
          onSelect={(e: any) => {
            setValue("name", e);
            setCustomer(e)
          }}
          value={watch(`phone`)}
          onChange={()=>{
            let name =getValues('name')
            if(typeof name ==='object'){
              setClearName(!clearName)
            }
          }}
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
});

export default CustomerDetails;
