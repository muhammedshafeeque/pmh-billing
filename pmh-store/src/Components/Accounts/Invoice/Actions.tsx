import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalPopup from "../../PopupModal/ModalPopup";
import ProcessPayment from "../ProcessPayment";

const Action: React.FC<{ totals: any; invoiceItems: any[]; customer: any }> = ({ totals, invoiceItems, customer }) => {
  const handlePayment = () => {
    console.log(invoiceItems)
    setShowModal(true);
  };
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    // Implement cancel logic
  };
  const handleCloseModal = () => {
    setShowModal(false);
   
  };

  return (
    <div>
     
      <Button variant="danger" className="me-2" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="warning" className="me-2" onClick={handlePayment}>
        Generate Bill
      </Button>
      <Button variant="success" className="me-2" onClick={handlePayment}>
        Process Payment (F2)
      </Button>

      <ModalPopup
        head={'Proceed Payment'}
        size="lg"
        show={showModal}
        handleClose={handleCloseModal}
        dialogClassName="vendor-modal"
      >
        <ProcessPayment/>
      </ModalPopup>
    </div>
  );
};

export default Action;
