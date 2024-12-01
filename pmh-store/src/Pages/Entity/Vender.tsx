import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import CreateAndUpdateVendor from "../../Components/Entity/CreateAndUpdateVendor";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import { FaPlus, FaSearch, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import "./Vendor.scss";

interface Vendor {
  _id: string;
  name: string;
  contactPhone: string;
  contactEmail: string;
  accountHEad: string;
  accountBallance: number;
}

const VendorList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<Vendor[]>([]);
  const [count, setCount] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState<any | null>(null);
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
  const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null);

  const fetchVendors = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        contactPhone: formData.contactPhone ? formData.contactPhone.contactPhone : "",
        skip: newSkip,
      };
      let query = queryString.stringify(params);
      let { data } = await axios.get(`entity/vendor?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchVendors(0);
  };

  useEffect(() => {
    fetchVendors(0);
  }, [showModal]);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchVendors(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchVendors(0);
  };

  const handleEdit = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const handleDelete = (vendor: Vendor) => {
    setVendorToDelete(vendor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (vendorToDelete) {
      try {
        setLoadingState(true);
        await axios.delete(`entity/vendor/${vendorToDelete._id}`);
        setShowDeleteModal(false);
        setVendorToDelete(null);
        fetchVendors(skip);
      } catch (error) {
        console.error("Error deleting vendor:", error);
      } finally {
        setLoadingState(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVendor(null);
  };

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Vendor Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Vendors</h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={4}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="name"
                  label="Name"
                  setValue={setValue}
                  readField={"name"}
                  url={`/entity/vendor?nameContains`}
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
                  readField={"contactPhone"}
                  url={`entity/vendor?contactPhoneContains`}
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
              <FaPlus /> New Vendor
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
                {results.map((vendor: Vendor) => (
                  <tr key={vendor._id}>
                    <td>{vendor.name}</td>
                    <td>{vendor.contactPhone}</td>
                    <td>{vendor.contactEmail}</td>
                    <td>{vendor.accountHEad}</td>
                    <td>{vendor.accountBallance}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(vendor)}
                        className="me-2"
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(vendor)}
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
        head={selectedVendor ? "Edit Vendor" : "Create New Vendor"}
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
        dialogClassName="vendor-modal"
      >
        <CreateAndUpdateVendor
          handleClose={handleCloseModal}
          vendorToEdit={selectedVendor}
        />
      </ModalPopup>

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Vendor"
        message={`Are you sure you want to delete the vendor "${vendorToDelete?.name}"?`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonVariant="danger"
      />
    </Container>
  );
};

export default VendorList;
