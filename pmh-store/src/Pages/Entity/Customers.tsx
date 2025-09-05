import React, { useEffect, useState } from "react";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import axios  from "../../Api/Api";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import { FaEdit, FaPlus, FaSearch, FaTimes, FaTrash } from "react-icons/fa";
import PaginationComponent from "../../Components/Pagination/Pagination";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import CreateAndUpdateCustomer from "../../Components/Entity/CreateAndUpdateCustomer";

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
  accountBallance: number;
}

const Customers: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<Customer[]>([]);
  const [count, setCount] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const { setLoadingState } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();
  const [skip, setSkip] = useState(0);
  const [clearChild, setClearChild] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const fetchCustomers = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        contactPhone: formData.contactPhone ? formData.contactPhone.contactPhone : "",
        skip: newSkip,
      };
      let query = queryString.stringify(params);
      let { data } = await axios.get(`entity/customer?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchCustomers(0);
  };

  useEffect(() => {
    fetchCustomers(0);
  }, [showModal]);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchCustomers(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchCustomers(0);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = (customer: Customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (customerToDelete) {
      try {
        setLoadingState(true);
        await axios.delete(`entity/customer/${customerToDelete._id}`);
        setShowDeleteModal(false);
        setCustomerToDelete(null);
        fetchCustomers(skip);
      } catch (error) {
        console.error("Error deleting customer:", error);
      } finally {
        setLoadingState(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Customers Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Customer</h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={4}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="name"
                  label="Name"
                  setValue={setValue}
                  readField={"firstName"}
                  url={`/entity/customer?firstNameContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={4}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="contactPhone"
                  label="Phone"
                  setValue={setValue}
                  readField={"phone"}
                  url={`entity/customer?phoneContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={4} style={{display:"flex",justifyContent:"flex-end"}} className="d-flex align-items-end">
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={handleClear}
                >
                  <FaTimes /> Clear
                </Button>
                <Button variant="primary" type="submit">
                  <FaSearch /> Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="results-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="card-title mb-0">Search Results</h5>
            <Button variant="success" onClick={() => setShowModal(true)}>
              <FaPlus /> New Customer
            </Button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Account Head</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((customer: Customer) => (
                  <tr key={customer._id}>
                    <td>{customer.firstName} {customer.lastName}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.accountHEad}</td>
                    <td>{customer.accountBallance}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(customer)}
                        className="me-2"
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(customer)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <PaginationComponent
              limit={10}
              totalCount={count}
              skip={skip}
              onPageChange={handlePageChange}
            />
          </div>
        </Card.Body>
      </Card>

      <ModalPopup
        head={selectedCustomer ? "Edit Customer" : "Create New Customer"}
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
        dialogClassName="customer-modal"
      >
        <CreateAndUpdateCustomer
          handleClose={handleCloseModal}
          customerToEdit={selectedCustomer}
        />
      </ModalPopup>

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete the customer "${customerToDelete?.firstName} ${customerToDelete?.lastName}"?`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonVariant="danger"
      />
    </Container>
  );
};

export default Customers;