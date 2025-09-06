import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Table, InputGroup } from "react-bootstrap";
import AutoComplete from "../../AutoComplete/AutoComplete";
import { useForm } from "react-hook-form";
import axios from "../../../Api/Api";
import { FaSearch, FaTimes } from "react-icons/fa";

const CustomerDetails: React.FC<{ 
  setCustomer: (customer: any) => void;
  disabled?: boolean;
}> = ({
  setCustomer,
  disabled = false,
}) => {
  const { register, errors, setValue,  getValues,watch }: any =
    useForm({
      defaultValues: {
        name: "",
        phone: "",
        address: "",
      },
    });
  const [isNew, setIsNew] = useState(false);
  const [showLookupModal, setShowLookupModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [clearName, setClearName] = useState(false);
  const [clearPhone, setClearPhone] = useState(false);

  const handleLookup = () => {
    setShowLookupModal(true);
    searchCustomers();
  };

  const searchCustomers = async (search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) {
        params.append('firstNameContains', search);
        params.append('phoneContains', search);
        params.append('lastNameContains', search);
      }
      
      const { data } = await axios.get(`/entity/customer?${params.toString()}`);
      setCustomers(data.results || []);
    } catch (error) {
      console.error("Error searching customers:", error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchCustomers(value);
  };

  const selectCustomer = (customer: any) => {
    setValue('name', customer);
    setValue('phone', customer);
    setCustomer(customer);
    setShowLookupModal(false);
    setSearchTerm("");
  };

  const handleCreateCustomer = async() => {
    const values = getValues(); // Get all form values
   let customer= await axios.post('/entity/create-customer-from-invoice',values)
   setCustomer(customer.data.response)
   setValue('name',customer.data.response),
   setValue('phone',customer.data.response)
  };
  useEffect(() => {
    if (watch('name')._id) {
      setIsNew(false);
    } else {
      setIsNew(true);
    }
  }, [watch('name')]);

  // Add keyboard shortcut for F3
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F3') {
        event.preventDefault();
        handleLookup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
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
          disabled={disabled}
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
          disabled={disabled}
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
      
      <Button 
        variant="outline-primary" 
        size="sm" 
        onClick={handleLookup}
        disabled={disabled}
      >
        Lookup Customer (F3)
      </Button>
      {isNew && (
        <Button
          variant="outline-success"
          className="ml-2"
          size="sm"
          onClick={handleCreateCustomer}
          disabled={disabled}
        >
          Create Customer
        </Button>
      )}

      {/* Customer Lookup Modal */}
      <Modal show={showLookupModal} onHide={() => setShowLookupModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Customer Lookup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Search Customers</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name, phone, or any field..."
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
              {searchTerm && (
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setSearchTerm("");
                    searchCustomers();
                  }}
                >
                  <FaTimes />
                </Button>
              )}
            </InputGroup>
          </Form.Group>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Account Balance</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length > 0 ? (
                    customers.map((customer) => (
                      <tr key={customer._id}>
                        <td>{`${customer.firstName || ''} ${customer.lastName || ''}`.trim()}</td>
                        <td>{customer.phone || 'N/A'}</td>
                        <td>{customer.email || 'N/A'}</td>
                        <td>
                          {customer.address 
                            ? typeof customer.address === 'object'
                              ? `${customer.address.street || ''} ${customer.address.city || ''} ${customer.address.state || ''} ${customer.address.zipCode || ''}`.trim() || 'N/A'
                              : customer.address
                            : 'N/A'
                          }
                        </td>
                        <td>
                          <span className={`badge ${
                            (customer.accountBallance || 0) >= 0 
                              ? 'bg-success' 
                              : 'bg-danger'
                          }`}>
                            ₹{(customer.accountBallance || 0).toFixed(2)}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => selectCustomer(customer)}
                          >
                            Select
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        {searchTerm ? 'No customers found' : 'Start typing to search customers'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLookupModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
};

export default CustomerDetails;
