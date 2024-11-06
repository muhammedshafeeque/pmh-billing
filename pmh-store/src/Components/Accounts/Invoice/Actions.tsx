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
  const { setLoadingState } = useLoading();
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    // Implement cancel logic
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
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
      generateInvoicePdf(inv.data.response)
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
      <Button
        variant="warning"
        className="me-2"
        onClick={generateInvoice}
        disabled={!customer._id || !invoiceItems.items.length}
      >
        Generate Bill
      </Button>
      <Button
        variant="success"
        className="me-2"
        onClick={handlePayment}
        disabled={!customer._id || !invoiceItems.items.length}
      >
        Process Payment (F2)
      </Button>

      <ModalPopup
        head={"Proceed Payment"}
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
        dialogClassName="vendor-modal"
      >
        <ProcessPayment />
      </ModalPopup>
    </div>
  );
};

export default Action;
