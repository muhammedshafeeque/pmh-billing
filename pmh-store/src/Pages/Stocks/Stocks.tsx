import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import CreateAndUpdateStock from "../../Components/Stock/CreateAndUpdateStock";
const StocksList:React.FC=()=>{
    const [showCreateModal, setShowCreateModal] = useState(false);
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
  
    const fetchSections = async (offset: number) => {
      try {
        setLoadingState(true);
        let formData = await getValues();
        let params = {
          name: formData.name ? formData.name.name : "",
          code: formData.code ? formData.code.code : "",
          racks: formData.rack ? formData.rack._id : "",
          category: formData.category ? formData.category._id : "",
          skip: offset,
        };
        let query = await queryString.stringify(params);
        let { data } = await axios.get(`/stock/stock?${query}`);
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
    }, [showCreateModal,]);
  
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
        <h4 className="screen_header">Stocks List</h4>
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
            <Col className="d-flex justify-content-end mt-4 pt-1">
              <Button
                variant="secondary"
                size="sm"
                style={{ marginRight: "10px", maxHeight: "30px" }}
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                variant="success"
                size="sm"
                type="submit"
                style={{ maxHeight: "30px" }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="mt-5"
        >
          {/* <Button
            variant="outline-primary"
            size="sm"
            style={{ marginRight: "10px" }}
            onClick={() => setShowBulkUploadModal(true)}
          >
            Bulk Upload
          </Button> */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowCreateModal(true)}
          >
            New
          </Button>
        </div>
  
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Purchase Rate/Unit</th>
              <th>Quantity</th>
              <th>Sellable Price/Unit</th>
              <th>Total</th>
              
            </tr>
          </thead>
          <tbody>
            {results.map((obj: any) => (
              <tr key={obj._id}>
                <td>{obj.name}</td>
                <td>{obj.code}</td>
                <td>{obj.category.name}</td>
                <td>{obj.unit.unitName}</td>
                <td>{obj.purchasedRatePerUnit}</td>
                <td>{obj.purchasedQuantity}</td>
                <td>{obj.sellablePricePerUnit}</td>
                <td>{obj.purchaseRate}</td>
                
              </tr>
            ))}
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
          head="Add New Stock"
          size="lg"
          show={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
        >
          <CreateAndUpdateStock handleClose={() => setShowCreateModal(false)} />
        </ModalPopup>
      </div>
    );
  };
export default StocksList