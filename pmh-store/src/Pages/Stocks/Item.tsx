import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import CreateAndUpdateItem from "../../Components/Stock/CreateAndUpdateItem";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";

interface Item {
  _id: string;
  name: string;
  code: string;
  category: string;
  racks: { _id: string; name: string }[];
  unit: string;
  totalStock: number;
}

const ItemsList: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [results, setResults] = useState<Item[]>([]);
  const [count, setCount] = useState(0);
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

  const fetchItems = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        code: formData.code ? formData.code.code : "",
        racks: formData.rack ? formData.rack._id : "",
        category: formData.category ? formData.category._id : "",
        skip: newSkip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`/stock/item?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchItems(0);
  };

  useEffect(() => {
    fetchItems(0);
  }, [showCreateModal]);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchItems(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchItems(0);
  };

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Item Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Items</h5>
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
                  url={`/stock/item?nameContains`}
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
                  url={`/stock/item?codeContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="category"
                  label="Category"
                  setValue={setValue}
                  readField={"name"}
                  url={`/stock/category?nameContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="rack"
                  label="Rack"
                  setValue={setValue}
                  readField={"code"}
                  url={`/stock/rack?codeContains`}
                  clear={clearChild}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={12} style={{display:"flex",justifyContent:"flex-end"}} className="d-flex align-items-end">
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
            <Button
              variant="success"
              onClick={() => setShowCreateModal(true)}
            >
              <FaPlus /> New Item
            </Button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Category</th>
                  <th>Racks</th>
                  <th>Unit</th>
                  <th>Existing Stocks</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: Item) => (
                  <tr key={obj._id}>
                    <td>{obj.name}</td>
                    <td>{obj.code}</td>
                    <td>{obj.category}</td>
                    <td>
                      {obj.racks.map((rack) => (
                        <span key={rack._id}>{rack.name}, </span>
                      ))}
                    </td>
                    <td>{obj.unit}</td>
                    <td>{obj.totalStock}</td>
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
        head="Create New Item"
        size="lg"
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      >
        <CreateAndUpdateItem
          handleClose={() => setShowCreateModal(false)}
        />
      </ModalPopup>
    </Container>
  );
};

export default ItemsList;
