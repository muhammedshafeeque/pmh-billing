import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalPopup from "../../PopupModal/ModalPopup";
import ProcessPayment from "../ProcessPayment";
import axios from "../../../Api/Api";
import { useLoading } from "../../../Contexts/LoaderContext";
import moment from "moment";
import { generateInvoicePdf } from "../../../Services/PdfService/invoice";

const Action: React.FC<{
  totals: any;
  invoiceItems: any;
  customer: any;
  invoiceDetails: any;
}> = ({ totals, invoiceItems, customer, invoiceDetails }) => {
  const handlePayment = () => {
    setShowModal(true);
  };
  const { setLoadingState } = useLoading() as { setLoadingState: (isLoading: boolean) => void };
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    // Implement cancel logic
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [inv, setInv] = useState();
  const generateInvoice = async () => {
    try {
      setLoadingState(true);
      let body: any = {
        customer: customer._id,
        items: invoiceItems.items.map((item: any) => {
          return {
            item: item.itemId,
            quantity: item.quantity,
            stock: item.stockId,
            unit: item.unitId,
          };
        }),
        date: moment(invoiceDetails.date).toISOString(),
        invoiceNumber: invoiceDetails.prefix.name,
        discount: totals.discount,
      };
      let inv = await axios.post("/accounts/generate-invoice", body);
      setInv(inv.data.response);
      // generateInvoicePdf(inv.data.response)
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div>
      <Button variant="danger" className="me-2" onClick={handleCancel}>
        Cancel
      </Button>
      {!inv && (
        <Button
          variant="warning"
          className="me-2"
          onClick={generateInvoice}
          disabled={!customer._id || !invoiceItems.items.length}
        >
          Generate Bill
        </Button>
      )}
      {inv && (
        <Button
          variant="info"
          className="me-2"
          onClick={() => {
            generateInvoicePdf(inv);
          }}
          disabled={!customer._id || !invoiceItems.items.length}
        >
          Print
        </Button>
      )}
      {inv && (
        <Button variant="success" className="me-2" onClick={handlePayment}>
          Process Payment (F2)
        </Button>
      )}

      <ModalPopup
        head={"Proceed Payment"}
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
        dialogClassName="vendor-modal"
      >
        <ProcessPayment customer={customer} />
      </ModalPopup>
    </div>
  );
};

export default Action;
