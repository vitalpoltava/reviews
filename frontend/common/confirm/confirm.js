import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmModal(props) {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm action
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.bodyText}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide.bind(this, false)}>
          Close
        </Button>
        <Button variant={props.buttonType || "primary"} onClick={props.onHide.bind(this, true)}>
          {props.confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;