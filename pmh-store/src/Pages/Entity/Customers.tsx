import React, { useEffect, useState } from "react";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import queryString from "query-string";
import { set, useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import axios from "../../Api/Api";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import { FaSearch, FaTimes, FaPlus, FaRegFileExcel, FaEdit, FaTrash } from "react-icons/fa";
import PaginationComponent from "../../Components/Pagination/Pagination";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import CreateAndUpdateCustomer from "../../Components/Entity/CreateAndUpdateCustomer";
import { bulkUploadCustomer, deleteCustomer, downloadCustomerSampleFile, getCustomerById } from "../../Services/api/EntityApi";
import ExcelFileUpload from "../../Components/ExcelFileUpload/ExcelFileUpload";
import { convertArrayBufferExcel } from "../../Utils/ExcelUtility";
interface Customer {
  _id: string;
  firstName: string;
  phone: string;
  contactEmail: string;
  accountHEad: any;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  accountBalance: number;
  accountBallance: number;
  country: string;
}
const Customers: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fetchCustomer = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = getValues();
      let params = {
        firstName: formData.name ? formData.name.firstName : "",
        phone: formData.contactPhone ? formData.contactPhone.phone : "",
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
    fetchCustomer(0);
  };

  useEffect(() => {
    fetchCustomer(0);
  }, [showModal]);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchCustomer(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchCustomer(0);
  };

  const handleEdit = async(customer: Customer) => {
    try {
      setLoadingState(true)
    let cut=await getCustomerById(customer._id)
    setSelectedCustomer(cut);
    setShowModal(true);
    } catch (error) {

    }finally{
      setLoadingState(false)
    }
    
  };

  const handleDelete = (customer: Customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if ( customerToDelete) {
      try {
        setLoadingState(true);
        await deleteCustomer(customerToDelete._id)
        setShowDeleteModal(false);
        setCustomerToDelete(null);
        fetchCustomer(skip);
      } catch (error) {
        console.error("Error deleting vendor:", error);
      } finally {
        setLoadingState(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };
  const handleBulkUploadModal = () => {
    setShowBulkUploadModal(false);
  }
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    try {
      setLoadingState(true);
      if (selectedFile) {
        await bulkUploadCustomer(selectedFile);
        fetchCustomer(skip);
        setShowBulkUploadModal(false)
      }

    } catch (error:any) {
      if (error.response.data.file) {
        convertArrayBufferExcel(
          error.response.data,
          "Category Upload Error File"
        );
      }
    }finally{
      setLoadingState(false);
    }
  };
  const handleDownloadSample = async() => {
      try {
        setLoadingState(true);
        let data=await downloadCustomerSampleFile()
        convertArrayBufferExcel(
          data,
          "Customer Sample File"
        );
      } catch (error) { 
      }finally{ 
        setLoadingState(false);
      }
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
              <Col md={4} style={{ display: "flex", justifyContent: "flex-end" }} className="d-flex align-items-end">
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
            <div className="d-flex">
              <Button variant="outline-primary" style={{ marginRight: "5px" }} onClick={() => setShowBulkUploadModal(true)}>
                <FaRegFileExcel /> Bulk Upload Customers
              </Button>
              <Button variant="success" onClick={() => setShowModal(true)}>
                <FaPlus /> New Customer
              </Button>
            </div>

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
                {results.map((customer: any) => (
                  <tr key={customer._id}>
                    <td>{customer.firstName}</td>
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
        head={selectedCustomer ? "Edit Vendor" : "Create New Customer"}
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
        dialogClassName="vendor-modal"
      >
        <CreateAndUpdateCustomer
          handleClose={handleCloseModal}
          customerToEdit={selectedCustomer}
        />
      </ModalPopup>
      <ModalPopup
        head={"Bulk Upload Customers"}
        size="lg"
        show={showBulkUploadModal}
        handleClose={handleBulkUploadModal}
        dialogClassName="vendor-modal"
      >
      <ExcelFileUpload
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          onDownloadSample={handleDownloadSample}
        />
      </ModalPopup>
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete the Customer "${customerToDelete?.firstName}"?`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonVariant="danger"
      />
    </Container>
  );
}

export default Customers