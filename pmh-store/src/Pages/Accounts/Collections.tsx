import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import moment from "moment";
import { FaSearch, FaTimes, FaPlus } from "react-icons/fa";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import CreateCollection from "../../Components/Accounts/CreateCollection";

const CollectionsList: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
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
  const [showModal, setShowModal] = useState(false);

  const fetchCollections = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        invoice: formData.invoice ? formData.invoice._id : "",
        customer: formData.customer ? formData.customer._id : "",
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        skip: newSkip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`accounts/collection?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchCollections(0);
  };

  useEffect(() => {
    fetchCollections(0);
  }, []);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchCollections(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchCollections(0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchCollections(skip);
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Collections Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Collections</h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="invoice"
                  label="Invoice Number"
                  setValue={setValue}
                  readField={"number"}
                  url={`accounts/invoice?numberContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="customer"
                  label="Customer Name"
                  setValue={setValue}
                  readField={"firstName"}
                  url={`/entity/customer?firstNameContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control type="date" {...register("fromDate")} />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control type="date" {...register("toDate")} />
                </Form.Group>
              </Col>
              <Col md={2} style={{display:"flex",justifyContent:"flex-end"}} className="d-flex align-items-end">
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
              <FaPlus /> New Collection
            </Button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Invoice Number</th>
                  <th>Customer Name</th>
                  <th>Collection Amount</th>
                  <th>Payment Mode</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: any) => (
                  <tr key={obj._id}>
                    <td>{moment(obj.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{moment(obj.createdAt).format("hh:mm:ss A")}</td>
                    <td>{obj.invoice?.number}</td>
                    <td>{obj.customer?.firstName} {obj.customer?.lastName}</td>
                    <td>₹{obj.amount}</td>
                    <td>{obj.paymentMode}</td>
                    <td>{obj.reference}</td>
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
        head="Create New Collection"
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
      >
        <CreateCollection handleClose={handleCloseModal} />
      </ModalPopup>
    </Container>
  );
};

export default CollectionsList;