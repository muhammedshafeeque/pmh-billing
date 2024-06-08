import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import CreateAndUpdateVendor from "../../Components/Entity/CreateAndUpdateVendor";
const VendorList: React.FC = () => {
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
  const fetchSections = async () => {
    try {
      setLoadingState(true);
      let formData = await getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        code: formData.code ? formData.code.code : "",
        skip: skip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`entity/vendor?${query}`);
      setResults(data.results);
      setCount(data.count);
    } catch (error) {
    } finally {
      setLoadingState(false);
    }
  };
  const onSubmit = () => {
    setSkip(0);
    fetchSections();
  };
  useEffect(() => {
    fetchSections();
  }, [showModal]);
  const handlePageChange = (page: number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchSections();
  };
  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchSections();
  };
  return (
    <div>
      <h4 className="screen_header">Venders List</h4>
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
              url={`/entity/vendor?nameContains`}
              clear={clearChild}
            />
          </Col>
          <Col md={3}>
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
      >
        <Button variant="primary" onClick={handleShowModal}>
          New
        </Button>
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Account Head</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {results.map((obj:Vendor) => {
            return (
              <tr key={obj._id}>
                <td>{obj.name}</td>
                <td>{obj.contactPhone}</td>
                <td>{obj.contactEmail}</td>
                <td>{obj.accountHEad}</td>
                <td>{obj.accountBallance}</td>
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
      <ModalPopup
        head="Create New Vendor"
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
      >
        <CreateAndUpdateVendor handleClose={handleCloseModal} />
      </ModalPopup>
    </div>
  );
};
export default VendorList;
