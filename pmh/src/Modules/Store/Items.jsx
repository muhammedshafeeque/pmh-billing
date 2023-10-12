import React, { useState } from "react";
import { Button, Col, Table } from "react-bootstrap";
import ModalComponent from "../../Components/Modal/Modal";
import CreateAndUpdateItem from "../../Components/CreateAndUpdateItem/CreateAndUpdateItem";

function Items() {
  const [modal, setModal] = useState(false);
  const handleModal=()=>{
    setModal(!modal)
  }
  return (
    <Col className="mt-5">
      <h4 style={{ textAlign: "center" }}>Items </h4>
      <div className="row col-md-12">
        <div className="col-md-10">
          <div className="col-md-3">
            {/* <SectionAutoCompleat setSection={setSection} /> */}
          </div>
        </div>
        <div className="col-md-2">
          <Button onClick={handleModal}>Create Item</Button>
        </div>
      </div>
      <ModalComponent show={modal} popup_head="Create ITEM">
        <CreateAndUpdateItem onHide={() => handleModal()}/>
        
      </ModalComponent>
      <Table className="table-bordered mt-2">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>Sections</th>
            <th>Racks</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Available Units</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </Col>
  );
}

export default Items;
