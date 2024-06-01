import React, { ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';

interface ModalPopupProps {
  children: ReactNode;
  head: ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  show: boolean;
  handleClose: () => void;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ children, head, size = 'lg', show, handleClose }) => {
  return (
    <Modal size={size} show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{head}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalPopup;
