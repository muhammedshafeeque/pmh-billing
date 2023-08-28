import React, { useEffect, useState } from "react";
import SectionAutoCompleat from "../../Components/AutoCompleat/SectionAutoCompleat";
import axios from "../../Api/Axios";
import { mainEndPoint } from "../../Constants/ApiConstants/mainRoutes";
import { configEndPoints } from "../../Constants/ApiConstants/config";
import { commonFilters } from "../../Constants/ApiConstants/apiFilters";
import { ApiDefaultValues } from "../../Constants/ApiConstants/ApiDefaultFilterValues";
import { useAlert } from "react-alert";
import { Stor } from "../../Context/BillerContext";
import CreateAndUpdateSection from "../../Components/CreateAndUpdateSection/CreateAndUpdateSection";
import Button from "react-bootstrap/esm/Button";
import ModalComponent from "../../Components/Modal/Modal";

function Section() {
  const [section, setSection] = useState();
  const [results, setResults] = useState([]);
  const alert = useAlert();
  const { setBlockUi } = Stor();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    setBlockUi(true);

    axios
      .get(
        mainEndPoint.STOCK +
          configEndPoints.SECTION +
          "?" +
          commonFilters.LIMIT +
          ApiDefaultValues.LIMIT +
          `${section ? "&" + commonFilters.ID + section._id : ""}`
      )
      .then(({ data }) => {
        setBlockUi(false);
        setResults(data);
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.response.error);
      });
  }, [section, setBlockUi, alert]);

  const handleModal = () => {
    if (modal) {
      setModal(false);
      setSection([]);
    } else {
      setModal(true);
    }
  };
  return (
    <div className="col-md-12">
      <h2 className="page_header">Sections</h2>
      <div className=" col-md-12 mt-5">
        <h5>Search Section</h5>
      </div>
      <div className="row col-md-12">
        <div className="col-md-10">
          <div className="col-md-3">
            <SectionAutoCompleat setSection={setSection} />
          </div>
        </div>
        <div className="col-md-2">
          <Button onClick={handleModal}>Create Section</Button>
        </div>
      </div>
      <ModalComponent show={modal} popup_head='Create Section' >
        <CreateAndUpdateSection onHide={() => handleModal()} />
      </ModalComponent>

      <table className="table table-bordered mt-4">
        <thead>
          <tr className="thead-light">
            <th>Name</th>
            <th>Code</th>
            <th>Number of Racks</th>
            <th>Total Investment</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.numberOfRacks}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Section;
