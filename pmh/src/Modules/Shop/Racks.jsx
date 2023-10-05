import React, { useEffect, useState } from "react";
import SectionAutoCompleat from "../../Components/AutoCompleat/SectionAutoCompleat";
import axios from "../../Api/Axios";
import { useAlert } from "react-alert";
import { Stor } from "../../Context/BillerContext";
import Button from "react-bootstrap/esm/Button";
import ModalComponent from "../../Components/Modal/Modal";
import CreateAndUpdateRack from "../../Components/CreateAndUpdateRack/CreateAndUpdateRack";
function Racks() {
  const [section, setSection] = useState();
  const [results, setResults] = useState([]);
  const alert = useAlert();
  const { setBlockUi } = Stor();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    setBlockUi(true);

    axios
      .get("/stock/rack")
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
      <h2 className="page_header">Racks</h2>
      <div className=" col-md-12 mt-5">
        <h5>Search Rack</h5>
      </div>
      <div className="row col-md-12">
        <div className="col-md-10">
          <div className="col-md-3">
            <SectionAutoCompleat setSection={setSection} />
          </div>
        </div>
        <div className="col-md-2">
          <Button onClick={handleModal}>Create Rack</Button>
        </div>
      </div>
      <ModalComponent show={modal} popup_head="Create Rack">
        <CreateAndUpdateRack onHide={() => handleModal()} />
      </ModalComponent>

      <table className="table table-bordered mt-4">
        <thead>
          <tr className="thead-light">
            <th>Name</th>
            <th>Code</th>
            <th>Section</th>
            <th>Total Investment</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.section.name}</td>
                <td>0</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Racks;
