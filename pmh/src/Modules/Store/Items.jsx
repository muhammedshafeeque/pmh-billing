import React, { useEffect, useState } from "react";
import { Button, Col, Table } from "react-bootstrap";
import ModalComponent from "../../Components/Modal/Modal";
import CreateAndUpdateItem from "../../Components/CreateAndUpdateItem/CreateAndUpdateItem";
import axios from "../../Api/Axios";
import { useAlert } from "react-alert";
import { Stor } from "../../Context/BillerContext";
function Items() {
  const [modal, setModal] = useState(false);
  const [items,setItems]=useState([])
  const alert=useAlert()
  const {setBlockUi} =Stor()
  const handleModal=()=>{
    setModal(!modal)
  }
  useEffect(()=>{
    
    axios.get('stock/item').then((res)=>{
      setItems(res.data)
      
    }).catch((err)=>{
      alert.error(err.res.data)
      
    })
  },[])
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
            <th>Racks</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Measurement </th>

          </tr>
        </thead>
        <tbody>
          {items.map((item)=>{
            return  <tr key={item._id}>
            <td>{item.name}</td>
            <td>{
              item.racks.map((rack)=>{
                return <span key={rack._id}>{rack.code},</span>
              })
              }</td>
            
            <td>{item.unit.Name}({item.unit.Symbol})</td>
            <td></td>
            <td>{item.unit.Quantity}</td>
          </tr>
          })}
          
        </tbody>
      </Table>
    </Col>
  );
}

export default Items;
