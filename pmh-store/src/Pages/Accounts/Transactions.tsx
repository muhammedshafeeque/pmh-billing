import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import moment from "moment";
import {  FaSearch, FaTimes } from "react-icons/fa";

const TransactionList: React.FC = () => {
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

  const fetchTransactions = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        fromAccount: formData.fromAccount ? formData.fromAccount._id : "",
        toAccount: formData.toAccount ? formData.toAccount._id : "",
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        skip: newSkip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`accounts/transaction?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchTransactions(0);
  };

  useEffect(() => {
    fetchTransactions(0);
  }, []);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchTransactions(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchTransactions(0);
  };

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Transaction Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Transactions</h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="fromAccount"
                  label="From Account"
                  setValue={setValue}
                  readField={"name"}
                  url={`accounts/account?nameContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="toAccount"
                  label="To Account"
                  setValue={setValue}
                  readField={"name"}
                  url={`accounts/account?nameContains`}
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
            {/* <Button variant="success">
              <FaPlus /> New Transaction
            </Button> */}
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>From Account</th>
                  <th>To Account</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: any) => (
                  <tr key={obj._id}>
                    <td>{moment(obj.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{moment(obj.createdAt).format("hh:mm:ss A")}</td>
                    <td>{obj.fromAccount?.name}</td>
                    <td>{obj.toAccount?.name}</td>
                    <td>{obj.amount}</td>
                    <td>{obj.description}</td>
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
    </Container>
  );
};

export default TransactionList;
