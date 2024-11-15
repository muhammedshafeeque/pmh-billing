import React from "react";
import { Table } from "react-bootstrap";

const InvoiceTotals: React.FC<{ totals: any; setTotals: (totals: any) => void ;customer:any}> = ({ totals,
  //  setTotals,customer
   }) => {
  return (
    <div>
      <h5>Totals</h5>
      <Table size="sm">
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td>${totals.billAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Discount:</td>
            <td>${totals.discount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>${(totals.payableAmount - totals.billAmount + totals.discount).toFixed(2)}</td>
          </tr>
          {/* <tr>
            <td>Outstanding</td>
            <td>${customer?customer.accountBallance:0}</td>
          </tr> */}
          <tr>
            <th>Total Due:</th>
            <th>${totals.payableAmount.toFixed(2)}</th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default InvoiceTotals;
