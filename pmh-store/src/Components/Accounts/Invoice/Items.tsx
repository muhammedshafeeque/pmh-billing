import { Col } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";

const ItemsForm: React.FC = () => {
  return (
    <>
      <Form>
       
          <Col className="inv-cards">
            <h5>Items</h5>
            <Table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Soap</td>
                </tr>
              </tbody>
            </Table>
          </Col>
    
      </Form>
    </>
  );
};
export default ItemsForm;
