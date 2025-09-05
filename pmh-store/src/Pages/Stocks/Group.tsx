import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import CategoryBulkUpload from "../../Components/Stock/CategoryBulkUpload";
import CreateAndUpdateCategory from "../../Components/Stock/CreateAndUpdateCategory";
import { FaEdit, FaPlus, FaSearch, FaTimes, FaTrash, FaUpload } from "react-icons/fa";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";

interface Group {
  _id: string;
  name: string;
  code: string;
  description: string;
}

const GroupList: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [results, setResults] = useState<Group[]>([]);
  const [count, setCount] = useState(0);
  const [clearChild, setClearChild] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Group | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Group | null>(null);
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

  const fetchGroups = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        code: formData.code ? formData.code.code : "",
        skip: newSkip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`/stock/category?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchGroups(0);
  };

  useEffect(() => {
    fetchGroups(0);
  }, [showCreateModal, showBulkUploadModal]);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchGroups(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchGroups(0);
  };

  const handleEdit = (category: Group) => {
    setSelectedCategory(category);
    setShowCreateModal(true);
  };

  const handleDelete = (category: Group) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        setLoadingState(true);
        await axios.delete(`stock/category/${categoryToDelete._id}`);
        setShowDeleteModal(false);
        setCategoryToDelete(null);
        fetchGroups(skip);
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setLoadingState(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setSelectedCategory(null);
  };

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Category Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Categories</h5>
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
                  url={`/stock/category?nameContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={4}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="code"
                  label="Code"
                  setValue={setValue}
                  readField={"code"}
                  url={`/stock/category?codeContains`}
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
            <div>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => setShowBulkUploadModal(true)}
              >
                <FaUpload /> Bulk Upload
              </Button>
              <Button
                variant="success"
                onClick={() => setShowCreateModal(true)}
              >
                <FaPlus /> New Category
              </Button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: Group) => (
                  <tr key={obj._id}>
                    <td>{obj.name}</td>
                    <td>{obj.code}</td>
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

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              Showing {skip + 1} to {Math.min(skip + 10, count)} of {count} entries
            </div>
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
        head={selectedCategory ? "Edit Category" : "Create New Category"}
        size="lg"
        show={showCreateModal}
        handleClose={handleCloseModal}
      >
        <CreateAndUpdateCategory
          handleClose={handleCloseModal}
          categoryToEdit={selectedCategory}
        />
      </ModalPopup>

      <ModalPopup
        head="Bulk Upload"
        size="lg"
        show={showBulkUploadModal}
        handleClose={() => setShowBulkUploadModal(false)}
      >
        <CategoryBulkUpload handleClose={() => setShowBulkUploadModal(false)} />
      </ModalPopup>

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete the category "${categoryToDelete?.name}"?`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonVariant="danger"
      />
    </Container>
  );
};

export default GroupList;
