import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLoading } from "../../Contexts/LoaderContext";
import { useForm } from "react-hook-form";
import PaginationComponent from "../../Components/Pagination/Pagination";
import moment from "moment";
import axios from '../../Api/Api'
import queryString from "query-string";
const Invoices: React.FC = () => {
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
  const onSubmit = () => {
    fetchInvoices(0)
  };
  const [skip, setSkip] = useState(0);
  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchInvoices(0)
  };

  function handlePageChange(page: number): void {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchInvoices(newSkip)
  }
  const fetchInvoices=async(newSkip: number)=>{
    try {
        setLoadingState(true);
        let formData = await getValues();
        let params = {
          number: formData.invoiceNumber? formData.invoiceNumber.number : "",
          customer: formData.customer ? formData.customer._id : "",
          invoiceDate: formData.billDate,
          skip: newSkip,
        };
        let query = await queryString.stringify(params);
        let { data } = await axios.get(`accounts/invoice?${query}`);
        setResults(data.results);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoadingState(false);
      }
  }
  useEffect(()=>{
     fetchInvoices(0)
  },[])

  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Invoice List</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Invoice</h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={3}>
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="invoiceNumber"
                  label="INV Number"
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
                <AutoComplete
                  register={register}
                  errors={errors}
                  name="Customer Phone Number"
                  label="phone"
                  setValue={setValue}
                  readField={"phone"}
                  url={`/entity/customer?phoneContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Bill Date</Form.Label>
                  <Form.Control type="date" {...register("billDate")} />
                </Form.Group>
              </Col>
              <Col
                md={2}
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="d-flex align-items-end"
              >
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
                  <th>Invoice Number</th>
                  <th>Customer Name</th>
                  <th>Contact Number</th>
                  <th>Total Items</th>
                  <th>Amount</th>
                  <th>Payable</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: any) => (
                  <tr key={obj._id}>
                    <td>{moment(obj.invoiceDate).format("DD-MM-YYYY")}</td>
                    <td>{obj.number}</td>
                    <td>{obj.customerName}</td>
                    <td>{obj.customerPhone}</td>
                    <th>{obj.items.length}</th>
                    <td>₹{obj.invoiceAmount}</td>
                    <td>₹{obj.payableAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              Showing {skip + 1} to {Math.min(skip + 10, count)} of {count}{" "}
              entries
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
export default Invoices;
