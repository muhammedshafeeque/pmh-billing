import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import CreateAndUpdateRack from "../../Components/Location/CreateAndUpdateRack";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import { FaPlus, FaSearch, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

const RackList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<Rack[]>([]);
  const [count, setCount] = useState(0);
  const [selectedRack, setSelectedRack] = useState<Rack | null>(null);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRack(null);
  };
  const handleShowModal = () => setShowModal(true);
  const [clearChild, setClearChild] = useState(false);
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rackToDelete, setRackToDelete] = useState<Rack | null>(null);

  const fetchRacks = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        code: formData.code ? formData.code.code : "",
        section: formData.section ? formData.section._id : "",
        skip: newSkip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`/stock/rack?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching racks:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchRacks(0);
  };

  useEffect(() => {
    fetchRacks(0);
  }, [showModal]);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchRacks(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchRacks(0);
  };

  const handleEdit = (rack: Rack) => {
    setSelectedRack(rack);
    setShowModal(true);
  };

  const handleDelete = (rack: Rack) => {
    setRackToDelete(rack);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (rackToDelete) {
      try {
        setLoadingState(true);
        await axios.delete(`/stock/rack/${rackToDelete._id}`);
        setShowDeleteModal(false);
        setRackToDelete(null);
        fetchRacks(skip);
      } catch (error) {
        console.error("Error deleting rack:", error);
      } finally {
        setLoadingState(false);
      }
    }
  };

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Rack Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Racks</h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="name"
                  label="Name"
                  setValue={setValue}
                  readField={"name"}
                  url={`/stock/rack?nameContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="code"
                  label="Code"
                  setValue={setValue}
                  readField={"code"}
                  url={`/stock/rack?codeContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="section"
                  label="Section"
                  setValue={setValue}
                  readField={"name"}
                  url={`/stock/section?nameContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={3} style={{display:"flex",justifyContent:"flex-end"}} className="d-flex align-items-end">
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
            <Button variant="success" onClick={handleShowModal}>
              <FaPlus /> New Rack
            </Button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Section</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: Rack) => (
                  <tr key={obj._id}>
                    <td>{obj.name}</td>
                    <td>{obj.code}</td>
                    <td>{obj.section}</td>
                    <td>{obj.description}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(obj)}
                        className="me-2"
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(obj)}
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
        head={selectedRack ? "Edit Rack" : "Create New Rack"}
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
        dialogClassName="rack-modal"
      >
        <CreateAndUpdateRack
          handleClose={handleCloseModal}
          rackToEdit={selectedRack}
        />
      </ModalPopup>

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Rack"
        message={`Are you sure you want to delete the rack "${rackToDelete?.name}"?`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonVariant="danger"
      />
    </Container>
  );
};

export default RackList;
