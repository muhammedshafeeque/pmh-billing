import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import './ModalPopup.scss';

interface ModalPopupProps {
  show: boolean;
  handleClose: () => void;
  head: string;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  dialogClassName?: string;
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  show,
  handleClose,
  head,
  children,
  size,
  dialogClassName,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      centered
      dialogClassName={`modal-popup ${dialogClassName}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>{head}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalPopup;
