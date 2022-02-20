import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

function Confirmation(props) {
  const { handleOpen, rejectTxn, confirmTxn, details } = props;

  return (
    <Modal
      className="Modal"
      show={handleOpen}
      onHide={rejectTxn}
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Receiving Address</strong>: {details.receiver}
        </p>
        <p>
          <strong>Token</strong>: {details.token}
        </p>
        <p>
          <strong>Amount</strong>: {details.amount}
        </p>
        <hr />
        <h5>
          <em>
            You cannot undo this transaction. Are you sure you want to proceed?
          </em>
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button className="ModalButton" variant="secondary" onClick={rejectTxn}>
          <strong>REJECT</strong>
        </Button>
        <Button className="ModalButton" variant="primary" onClick={confirmTxn}>
          <strong>CONFIRM</strong>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confirmation;
