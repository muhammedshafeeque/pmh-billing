import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import moment from "moment";
const TransactionList: React.FC = () => {
  const [results, setResults] = useState<Vendor[]>([]);
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
  const fetchSections = async (offset: number) => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        code: formData.code ? formData.code.code : "",
        skip: offset,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`accounts/transaction?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
    } finally {
      setLoadingState(false);
    }
  };
  const onSubmit = () => {
    setSkip(0);
    fetchSections(0);
  };
  useEffect(() => {
    fetchSections(0);
  }, []);
  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchSections(newSkip);
  };
  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchSections(0);
  };
  return (
    <div>
      <h4 className="screen_header">Transaction List</h4>
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
              url={`accounts/account?nameContains`}
              clear={clearChild}
            />
          </Col>

          <Col className="d-flex justify-content-end mt-4 pt-1">
            <Button
              variant="secondary"
              style={{ marginRight: "10px", maxHeight: "40px" }}
              className="mr-2"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button variant="success" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <div
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="mt-4"
      ></div>

      <table className="table table-striped">
        <thead className="thead-dark">
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
          {results.map((obj: any) => {
            return (
              <tr key={obj._id}>
                <td>{moment(obj.createdAt).format('DD-MM-YYYY')}</td>
                <td>{moment(obj.createdAt).format("hh:mm:ss")}</td>
                <td>{obj.fromAccount?.name}</td>
                <td>{obj.toAccount.name}</td>
                <td>{obj.amount}</td>
                <td>{obj.description}</td>

              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="col-md-12 d-flex justify-content-end mt-4 pt-1">
        <PaginationComponent
          limit={10}
          totalCount={count}
          skip={skip}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default TransactionList;
