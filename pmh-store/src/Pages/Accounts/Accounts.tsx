import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import CreateAndUpdateAccount from "../../Components/Accounts/CreateAndUpdateAccount";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";

const AccountsList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<Vendor[]>([]);
  const [count, setCount] = useState(0);
  const handleCloseModal = () => setShowModal(false);
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

  const fetchAccounts = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        skip: newSkip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`accounts/account?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchAccounts(0);
  };

  useEffect(() => {
    fetchAccounts(0);
  }, [showModal]);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchAccounts(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchAccounts(0);
  };

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Accounts Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Accounts</h5>
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
                  url={`accounts/account?nameContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={8} style={{display:"flex",justifyContent:"flex-end"}} className="d-flex align-items-end">
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
              <FaPlus /> New Account
            </Button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Account Head</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: Vendor) => (
                  <tr key={obj._id}>
                    <td>{obj.name}</td>
                    <td>{obj.accountHEad}</td>
                    <td>{obj.accountBallance}</td>
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
        head="Create New Account"
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
      >
        <CreateAndUpdateAccount handleClose={handleCloseModal} />
      </ModalPopup>
    </Container>
  );
};

export default AccountsList;
