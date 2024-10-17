import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import CreateAndUpdateSection from "../../Components/Location/CreateAndUpdateSection";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import { FaPlus, FaSearch, FaTimes, FaSave } from "react-icons/fa";
import "./Section.scss";

const SectionList: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [results,setResults]=useState<Section[]>([])
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
  const fetchSections=async()=>{
    try {
      setLoadingState(true)
      let formData = await getValues();
      let params = {
        name: formData.name ? formData.name.name : "",
        code: formData.code ? formData.code.code : "",
        skip: skip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`/stock/section?${query}`);
      setResults(data.results)
      setCount(data.count)
    } catch (error) {
      
    }finally{
      setLoadingState(false)
    }
  }
  const onSubmit=()=>{
    setSkip(0)
    fetchSections()
  }
  useEffect(()=>{
    fetchSections()
  },[showModal])
  const handlePageChange = (page:number) => {
    const newSkip = (page - 1) * 10;
    setSkip(newSkip);
    fetchSections()
  };
  const handleClear = () => {
    reset();
    setClearChild(!clearChild);
    fetchSections()
  };
  return (
    <Container fluid className="section-list">
      <h2 className="page-title mb-4">Section Management</h2>
      <Card className="mb-4 search-card">
        <Card.Body>
          <h5 className="card-title mb-4">Search Sections</h5>
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
                  url={`/stock/section?nameContains`}
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
                  url={`/stock/section?codeContains`}
                  clear={clearChild}
                />
              </Col>
              <Col md={4} className="d-flex align-items-end">
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
              <FaPlus /> New Section
            </Button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {results.map((obj: Section) => (
                  <tr key={obj.code}>
                    <td>{obj.name}</td>
                    <td>{obj.code}</td>
                    <td>{obj.description}</td>
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
        head="Create New Section"
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
        dialogClassName="section-modal"
      >
        <CreateAndUpdateSection handleClose={handleCloseModal} />
        
      </ModalPopup>
    </Container>
  );
};

export default SectionList;
