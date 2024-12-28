import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../Api/Api";
import moment from "moment";
import { generateInvoicePdf } from "../../Services/PdfService/invoice";

const BillView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inv, setInv] = useState<any>();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const { data } = await axios.get(`accounts/bill/${id}`);
        setInv(data);
      } catch (error) {
        console.error("Error fetching bill:", error);
      }
    };
    fetchingData();
  }, [id]);

  if (!inv) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="section-list py-4">
      <div className="bg-white p-4 rounded shadow-sm">
        {/* Header Section */}
        <h2 className="page-title border-bottom pb-3 mb-4">
          Bill: {inv.referenceNumber}
        </h2>

        {/* Bill Details Section */}
        <Row className="mt-4 g-4">
          <Col md={6}>
            <div className="p-3 bg-light rounded">
              <h5 className="mb-3 text-primary">Bill Details</h5>
              <p className="mb-2">
                <strong>Date:</strong> {moment(inv.invoiceDate).format("DD-MM-YYYY")}
              </p>
              <p className="mb-2">
                <strong>Total Amount:</strong> ${inv.payableAmount}
              </p>
            </div>
          </Col>

          <Col md={6}>
            <div className="p-3 bg-light rounded">
              <h5 className="mb-3 text-primary">Vendor Information</h5>
              <p className="mb-2">
                <strong>Name:</strong> {inv.vendor.name}
              </p>
              <p className="mb-2">
                <strong>Mobile:</strong> {inv.vendor.contactPhone}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {inv.vendor.contactEmail}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {inv.vendor.street}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {inv.vendor.state}, {inv.vendor.country}
              </p>
              <p className="mb-2">
                <strong>PIN:</strong> {inv.vendor.zipCode}
              </p>
            </div>
          </Col>
        </Row>

        {/* Items Table Section */}
        <div className="mt-5">
          <h3 className="page-title mb-4 text-primary">Items</h3>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="text-center">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Code</th>
                  <th scope="col">Unit</th>
                  <th scope="col" className="text-end">Quantity</th>
                  <th scope="col" className="text-end">Price Per Unit</th>
                  <th scope="col" className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {inv.items.map((obj: any, i: number) => (
                  <tr key={obj._id}>
                    <td className="text-center">{i + 1}</td>
                    <td>{obj.item.name}</td>
                    <td>{obj.item.code}</td>
                    <td>{obj.item.unit.unitCode}</td>
                    <td className="text-end">{obj.purchasedQuantity}</td>
                    <td className="text-end">${obj.purchaseRate}</td>
                    <td className="text-end">${obj.purchasedQuantity * obj.purchaseRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Print Button Section */}
        <div className="mt-4 d-flex justify-content-end">
          <Button 
            variant="primary"
            onClick={() => generateInvoicePdf(inv)}
          >
            Print Invoice
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default BillView;