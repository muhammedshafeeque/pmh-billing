import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalPopup from "../../PopupModal/ModalPopup";
import ProcessPayment from "../ProcessPayment";
import axios from "../../../Api/Api";
import { useLoading } from "../../../Contexts/LoaderContext";
import moment from "moment";
import { generateInvoicePdf } from "../../../Services/PdfService/invoice";
import { useKeyboardShortcuts, KEYBOARD_SHORTCUTS } from '../../../Utils/KeyboardHandler';

const Action = forwardRef<any, {
  totals: any;
  invoiceItems: any;
  customer: any;
  invoiceDetails: any;
  onCancel: () => void;
  onPaymentComplete: () => void;
  setInv: (inv: any) => void;
}>(({ totals, invoiceItems, customer, invoiceDetails, onCancel, onPaymentComplete, setInv: setParentInv }, ref) => {
  const handlePayment = async () => {
    setLoadingState(true)
    let cu: any = await axios.get(`entity/customer/${customer._id}`)
    setCustomerFull(cu.data)
    setShowModal(true);
    setLoadingState(false)
  };
  const { setLoadingState } = useLoading() as { setLoadingState: (isLoading: boolean) => void };
  const [showModal, setShowModal] = useState(false);
  const [customerFull, setCustomerFull] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleCancel = () => {
    setShowConfirmDialog(true);
  };

  const confirmCancel = () => {
    setInv(undefined);
    setCustomerFull(null);
    setShowModal(false);
    setShowConfirmDialog(false);
    
    onCancel();
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
      let response = await axios.post("/accounts/generate-invoice", body);
      setInv(response.data.response);
      setParentInv(response.data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  const handlePaymentSuccess = () => {
    // Reset local states without confirmation
    setInv(undefined);
    setCustomerFull(null);
    setShowModal(false);
    
    // Call parent reset function
    onPaymentComplete();
  };

  useKeyboardShortcuts([
    {
      key: KEYBOARD_SHORTCUTS.PAYMENT,
      handler: () => {
        if (inv) {
          handlePayment();
        }
      }
    },
    {
      key: KEYBOARD_SHORTCUTS.CANCEL,
      handler: () => {
        if (!showModal) {
          handleCancel();
        }
      }
    }
  ]);

  useImperativeHandle(ref, () => ({
    handlePayment
  }));

  return (
    <div>
      {/* Confirmation Modal */}
      <Modal show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel? All unsaved changes will be lost.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDialog(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmCancel}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Action Buttons */}
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
        <ProcessPayment 
          customer={customerFull} 
          setShowModal={setShowModal}
          onPaymentComplete={handlePaymentSuccess}
        />
      </ModalPopup>
    </div>
  );
});

export default Action;
