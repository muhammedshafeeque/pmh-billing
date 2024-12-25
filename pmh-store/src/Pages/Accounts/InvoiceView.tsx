import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../Api/Api";
import { Col } from "react-bootstrap";
import moment from "moment";
const InvoiceView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inv, setInv] = useState<any>();
  useEffect(() => {
    const fetchingData = async () => {
      let { data } = await axios.get(`accounts/invoice/${id}`);
      setInv(data);
    };
    fetchingData();
  }, []);
  return (
    <>
      {inv && (
        <Container fluid className="section-list">
          <h2 className="page-title mb-4">Invoice :{inv.number}</h2>
          <Row className="mt-5">
            <Col>
              <h5>Date : {moment(inv.invoiceDate).format("DD-MM-YYYY")}</h5>
              <h5>Total : {inv.payableAmount} </h5>
            </Col>
            <Col>
              <h5>Name : {inv.customer.firstName}</h5>
              <h5>Mobile: {inv.customer.phone}</h5>
            </Col>
          </Row>
          <h3 className="page-title mt-5">ITEMS</h3>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>SL No</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {inv.items.map((obj: any, i: number) => (
                  <tr key={obj._id}>
                    <td>{i + 1}</td>
                    <td>{obj.item.name}</td>
                    <td>{obj.item.code}</td>
                    <td>{obj.item.unit.unitCode}</td>
                    <td>{obj.quantity}</td>
                    <td>{obj.pricePerUnit}</td>
                    <td>{obj.quantity * obj.pricePerUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="mt-4 col-md-12"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="float-right">
              <Button>Print</Button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};
export default InvoiceView;
