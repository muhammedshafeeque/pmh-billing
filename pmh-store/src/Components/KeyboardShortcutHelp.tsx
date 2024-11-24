import React from 'react';
import { Modal, Table } from 'react-bootstrap';

interface ShortcutHelpProps {
  show: boolean;
  onHide: () => void;
}

const KeyboardShortcutHelp: React.FC<ShortcutHelpProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Keyboard Shortcuts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F1</td>
              <td>Save</td>
            </tr>
            <tr>
              <td>F2</td>
              <td>Process Payment</td>
            </tr>
            <tr>
              <td>F3</td>
              <td>Customer Lookup</td>
            </tr>
            <tr>
              <td>F4</td>
              <td>New Invoice</td>
            </tr>
            <tr>
              <td>F5</td>
              <td>Print Invoice</td>
            </tr>
            <tr>
              <td>ESC</td>
              <td>Cancel/Close</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default KeyboardShortcutHelp; 