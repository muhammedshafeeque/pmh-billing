import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalPopup from "../../Components/PopupModal/ModalPopup";
import axios from "../../Api/Api";
import { useForm } from "react-hook-form";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../../Components/AutoComplete/AutoComplete";
import PaginationComponent from "../../Components/Pagination/Pagination";
import queryString from "query-string";
import CategoryBulkUpload from "../../Components/Stock/CategoryBulkUpload";
import CreateAndUpdateCategory from "../../Components/Stock/CreateAndUpdateCategory";

interface Section {
  name: string;
  code: string;
  description: string;
}

const GroupeList: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [results, setResults] = useState<Section[]>([]);
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
      let { data } = await axios.get(`/stock/category?${query}`);
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
  }, [showCreateModal, showBulkUploadModal]);

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
      <h4 className="screen_header">Category List</h4>
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
              url={`/stock/category?nameContains`}
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
              url={`/stock/category?codeContains`}
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
        <Button
          variant="outline-primary"
          size="sm"
          style={{ marginRight: "10px" }}
          onClick={() => setShowBulkUploadModal(true)}
        >
          Bulk Upload
        </Button>
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
      <div className="col-md-12 d-flex justify-content-end mt-4 pt-1">
        <PaginationComponent
          limit={10}
          totalCount={count}
          skip={skip}
          onPageChange={handlePageChange}
        />
      </div>
      <ModalPopup
        head="Create New Category"
        size="lg"
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      >
        <CreateAndUpdateCategory
          handleClose={() => setShowCreateModal(false)}
        />
      </ModalPopup>
      <ModalPopup
        head="Bulk Upload"
        size="lg"
        show={showBulkUploadModal}
        handleClose={() => setShowBulkUploadModal(false)}
      >
        <CategoryBulkUpload  handleClose={() => setShowBulkUploadModal(false)}/>
      </ModalPopup>
    </div>
  );
};

export default GroupeList;
