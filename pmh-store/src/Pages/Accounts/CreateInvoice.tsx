import { Col, Row } from "react-bootstrap";
import CostumerDetails from "../../Components/Accounts/Invoice/CostomerDetails";
import InvoiceDetails from "../../Components/Accounts/Invoice/InvoiceDetails";
import ItemsForm from "../../Components/Accounts/Invoice/Items";
import InvoiceTotals from "../../Components/Accounts/Invoice/Totals";
import Action from "../../Components/Accounts/Invoice/Actions";

const CreateInvoice: React.FC = () => {
  return (
    <>
      <div className="col-md-12">
        <Row>
          <Col>
            <CostumerDetails />
          </Col>
          <Col>
            <InvoiceDetails />
          </Col>
        </Row>
        <Row className="mt-4 ">
          <Col>
            <ItemsForm />
          </Col>
        </Row>

        <Row className="mt-4 ">
          <Col>
            <Action />
          </Col>
          <Col>
            <InvoiceTotals />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreateInvoice;
