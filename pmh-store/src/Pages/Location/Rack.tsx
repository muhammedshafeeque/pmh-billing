import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import CreateAndUpdateRack from "../../Components/Location/CreateAndUpdateRack";
const RackList:React.FC=()=>{
    const [showModal, setShowModal] = useState(false);
  const [results,setResults]=useState<Rack[]>([])
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
        section:formData.section?formData.section._id:'',
        skip: skip,
      };
      let query = await queryString.stringify(params);
      let { data } = await axios.get(`/stock/rack?${query}`);
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
    <div>
      <h4 className="screen_header">Rack List</h4>
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
              url={`/stock/rack?nameContains`}
              clear={clearChild}             />
          </Col>
          <Col md={3}>
            <AutoComplete
              register={register}
              errors={errors}
              name="code"
              label="Code"
              setValue={setValue}
              readField={"code"}
              url={`/stock/rack?codeContains`}
              clear={clearChild}
            />
          </Col>
          <Col md={3}>
            <AutoComplete
              register={register}
              errors={errors}
              name="section"
              label="Section"
              setValue={setValue}
              readField={"code"}
              url={`/stock/section?nameContains`}
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
      <div style={{ display: "flex", justifyContent: "flex-end" }} className="mt-4">
        <Button variant="primary" onClick={handleShowModal}>
          New
        </Button>
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Section</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {results.map((obj:Rack) => {
            return (
              <tr key={obj.code}>
                <td>{obj.name}</td>
                <td>{obj.code}</td>
                <td>{obj.section}</td>
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
      <ModalPopup
        head="Create New Rack"
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
      >
        <CreateAndUpdateRack  handleClose={handleCloseModal}  />
      </ModalPopup>
    </div>
  );
};
export default RackList