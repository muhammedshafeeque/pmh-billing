import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import axios from "../../../Api/Api";
import { useLoading } from "../../../Contexts/LoaderContext";
import moment from "moment";
import { generateInvoicePdf } from "../../../Services/PdfService/invoice";
import { FaCheck, FaCreditCard, FaFileInvoice, FaPlus, FaPrint, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const Action: React.FC<{
  totals: any;
  invoiceItems: any;
  customer: any;
  invoiceDetails: any;
  onNewInvoice?: () => void;
  onInvoiceGenerated?: (invoice: any) => void;
  isInvoiceGenerated?: boolean;
}> = ({ totals, invoiceItems, customer, invoiceDetails, onNewInvoice, onInvoiceGenerated, isInvoiceGenerated = false }) => {
  const { setLoadingState } = useLoading();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  
  // Payment form
  const { register: paymentRegister, handleSubmit: handlePaymentSubmit, setValue: setPaymentValue, formState: { errors: paymentErrors } } = useForm({
    defaultValues: {
      paymentAmount: 0,
      receivingAccount: ""
    }
  });

  // Fetch accounts for dropdown
  const fetchAccounts = async () => {
    try {
      const response = await axios.get('/accounts/account?limit=100');
      setAccounts(response.data.results || []);
      console.log('Fetched accounts:', response.data.results);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setAccounts([]);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleCancel = () => {
    // Implement cancel logic
  };

  const handleCloseSuccessModal = () => {
    console.log("Closing success modal");
    setShowSuccessModal(false);
    setGeneratedInvoice(null);
  };

  const handleProcessPayment = async (paymentData: any) => {
    try {
      setLoadingState(true);
      
      const paymentBody = {
        customer: customer._id,
        amount: paymentData.paymentAmount,
        account: paymentData.receivingAccount
      };
      
      console.log("Processing payment with body:", paymentBody);
      await axios.post("/accounts/process-payment", paymentBody);
      console.log("Payment processed successfully");
      
      // Close success modal and show confirmation
      setShowSuccessModal(false);
      alert("Payment processed successfully!");
      
      // Optionally trigger new invoice
      if (onNewInvoice) {
        onNewInvoice();
      }
      
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Error processing payment. Please try again.");
    } finally {
      setLoadingState(false);
    }
  };

  const handleNewInvoice = () => {
    // Clear all local states in Actions component
    setShowSuccessModal(false);
    setGeneratedInvoice(null);
    
    // Reset payment form
    setPaymentValue('paymentAmount', 0);
    setPaymentValue('receivingAccount', "");
    
    console.log("Actions component cleared - calling parent handleNewInvoice");
    
    if (onNewInvoice) {
      onNewInvoice();
    }
  };

  const handlePrintInvoice = () => {
    if (generatedInvoice) {
      generateInvoicePdf(generatedInvoice);
    }
  };
  const generateInvoice = async (e?: React.MouseEvent) => {
    // Prevent any default behavior and event bubbling
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

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
      
      console.log("Generating invoice with body:", body);
      let inv = await axios.post("/accounts/generate-invoice", body);
      console.log("Invoice generated successfully:", inv.data.response);
      
      // Store the generated invoice 
      const invoiceData = inv.data.response;
      setGeneratedInvoice(invoiceData);
      
      // Stop loading before showing modal
      setLoadingState(false);
      
      // Show success modal
      setShowSuccessModal(true);
      console.log("Success modal should be visible now");
      
      // Notify parent component about invoice generation
      if (onInvoiceGenerated) {
        onInvoiceGenerated(invoiceData);
      }
      
    } catch (error) {
      console.error("Invoice generation error:", error);
      alert("Error generating invoice. Please try again.");
      setLoadingState(false);
    }
  };

  // Debug logging
  console.log("Actions component render - showSuccessModal:", showSuccessModal, "generatedInvoice:", !!generatedInvoice);

  return (
    <div>
      {!isInvoiceGenerated ? (
        <>
          <Button variant="danger" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="warning"
            className="me-2"
            onClick={(e) => generateInvoice(e)}
            disabled={!customer._id || !invoiceItems.items.length}
            type="button"
          >
            Generate Bill
          </Button>
        </>
      ) : (
        <>
          <Button 
            variant="success" 
            className="me-2" 
            onClick={handleNewInvoice}
          >
            <FaPlus className="me-1" />
            New Invoice
          </Button>
          <Button 
            variant="outline-primary" 
            className="me-2" 
            onClick={handlePrintInvoice}
          >
            <FaPrint className="me-1" />
            Print Invoice
          </Button>
        </>
      )}


      {/* Success Modal with Inline Payment */}
      <Modal 
        show={showSuccessModal} 
        onHide={handleCloseSuccessModal} 
        size="lg" 
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>
            <FaCheck className="me-2" />
            Invoice Generated Successfully!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          {generatedInvoice && (() => {
            // Calculate total payable amount: Invoice Amount + Outstanding Amount
            const invoiceAmount = totals.billAmount || 0;
            const outstandingAmount = customer.accountBallance ? Math.abs(customer.accountBallance) : 0;
            const totalPayableAmount = invoiceAmount + outstandingAmount;
            
            return (
            <div>
              {/* Invoice Summary */}
              <Row className="mb-4">
                <Col md={6}>
                  <div className="card border-success">
                    <div className="card-header bg-success text-white py-2">
                      <h6 className="mb-0">
                        <FaFileInvoice className="me-2" />
                        Invoice Details
                      </h6>
                    </div>
                    <div className="card-body p-3">
                      <div className="row g-2">
                        <div className="col-4"><strong>Invoice #:</strong></div>
                        <div className="col-8">{generatedInvoice.invoiceNumber}</div>
                        <div className="col-4"><strong>Customer:</strong></div>
                        <div className="col-8">{customer.firstName} {customer.lastName}</div>
                        <div className="col-4"><strong>Phone:</strong></div>
                        <div className="col-8">{customer.phone}</div>
                        <div className="col-4"><strong>Date:</strong></div>
                        <div className="col-8">{moment().format('DD/MM/YYYY')}</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="card border-primary">
                    <div className="card-header bg-primary text-white py-2">
                      <h6 className="mb-0">
                        <FaCreditCard className="me-2" />
                        Amount Details
                      </h6>
                    </div>
                    <div className="card-body p-3">
                      <div className="row g-2">
                        <div className="col-6"><strong>Invoice Amount:</strong></div>
                        <div className="col-6 text-end">₹{invoiceAmount.toFixed(2)}</div>
                        <div className="col-6"><strong>Outstanding:</strong></div>
                        <div className="col-6 text-end">₹{outstandingAmount.toFixed(2)}</div>
                        <hr className="my-2" />
                        <div className="col-6"><strong>Total Payable:</strong></div>
                        <div className="col-6 text-end">
                          <span className="badge bg-success fs-6">₹{totalPayableAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Payment Form */}
              <div className="card border-warning">
                <div className="card-header bg-warning text-dark py-2">
                  <h6 className="mb-0">
                    <FaCreditCard className="me-2" />
                    Process Payment
                  </h6>
                </div>
                <div className="card-body p-3">
                  <Form onSubmit={handlePaymentSubmit(handleProcessPayment)}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">
                            <FaCreditCard className="me-1 text-primary" />
                            Payment Amount
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text bg-light">₹</span>
                            <Form.Control
                              type="number"
                              step="0.01"
                              min="0"
                              max={totalPayableAmount}
                              defaultValue={totalPayableAmount}
                              {...paymentRegister('paymentAmount', { 
                                required: 'Payment amount is required',
                                min: { value: 0.01, message: 'Amount must be greater than 0' },
                                max: { value: totalPayableAmount, message: 'Amount cannot exceed total payable amount' }
                              })}
                              className={`form-control ${paymentErrors.paymentAmount ? 'is-invalid' : ''}`}
                              placeholder="0.00"
                            />
                          </div>
                          {paymentErrors.paymentAmount && (
                            <div className="invalid-feedback d-block">
                              {paymentErrors.paymentAmount.message}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-bold">
                            <FaCheck className="me-1 text-success" />
                            Receiving Account
                          </Form.Label>
                          <Form.Select
                            {...paymentRegister('receivingAccount', { 
                              required: 'Please select a receiving account'
                            })}
                            className={`form-select ${paymentErrors.receivingAccount ? 'is-invalid' : ''}`}
                          >
                            <option value="">Select Account</option>
                            {accounts.map((account) => (
                              <option key={account._id} value={account._id}>
                                {account.accountHEad} - Balance: ₹{account.accountBallance?.toFixed(2) || '0.00'}
                              </option>
                            ))}
                          </Form.Select>
                          {paymentErrors.receivingAccount && (
                            <div className="invalid-feedback d-block">
                              {paymentErrors.receivingAccount.message}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  
                    {/* Action Buttons */}
                    <hr className="my-3" />
                    <Row className="g-2">
                      <Col md={3}>
                        <Button 
                          type="submit"
                          variant="primary" 
                          className="w-100 py-2 fw-bold"
                          size="sm"
                        >
                          <FaCreditCard className="me-2" />
                          PROCESS PAYMENT
                        </Button>
                      </Col>
                      <Col md={3}>
                        <Button 
                          variant="outline-info" 
                          className="w-100 py-2"
                          onClick={handlePrintInvoice}
                          size="sm"
                        >
                          <FaPrint className="me-2" />
                          Print Invoice
                        </Button>
                      </Col>
                      <Col md={3}>
                        <Button 
                          variant="success" 
                          className="w-100 py-2"
                          onClick={handleNewInvoice}
                          size="sm"
                        >
                          <FaPlus className="me-2" />
                          New Invoice
                        </Button>
                      </Col>
                      <Col md={3}>
                        <Button 
                          variant="outline-secondary" 
                          className="w-100 py-2"
                          onClick={handleCloseSuccessModal}
                          size="sm"
                        >
                          <FaTimes className="me-2" />
                          Close
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
            );
          })()}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Action;
