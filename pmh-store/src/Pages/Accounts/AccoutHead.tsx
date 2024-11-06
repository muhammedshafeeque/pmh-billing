import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import { FaSearch, FaTimes } from "react-icons/fa";

const AccountHeadList: React.FC = () => {
  const [results, setResults] = useState<AccountHeads[]>([]);
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

  const fetchAccountHeads = async (newSkip: number) => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        skip: newSkip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`accounts/account-heads?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching account heads:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    setSkip(0);
    fetchAccountHeads(0);
  };

  useEffect(() => {
    fetchAccountHeads(0);
  }, []);

  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchAccountHeads(newSkip);
  };

  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchAccountHeads(0);
  };

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Account Head Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Account Heads</h5>
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
                  url={`accounts/account-heads?nameContains`}
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
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Total Credit</th>
                  <th>Total Debits</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: AccountHeads) => (
                  <tr key={obj._id}>
                    <td>{obj.name}</td>
                    <td>{obj.type}</td>
                    <td>{obj.credit}</td>
                    <td>{obj.debit}</td>
                    <td>{obj.accountBalance}</td>
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

export default AccountHeadList;
