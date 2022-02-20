import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { bscScan } from "./formObjects.js";

function Status(props) {
  const { handleOpen, handleClose, details } = props;
  return (
    <ToastContainer className="ToastContainer" position="top-end">
      <Toast
        className="Toast"
        show={handleOpen}
        onClose={handleClose}
        delay={7000}
        autohide
      >
        <Toast.Header className="ToastHeader">
          <strong className="me-auto">
            Transaction {details.txnSuccess ? "Completed" : "Failed"}
          </strong>
        </Toast.Header>
        <Toast.Body>
          <p>
            <strong>Time</strong>: {details.datetime}
          </p>
          <p>
            <strong>Transaction ID</strong>:{" "}
            {bscScan(details.transactionId, "tx", details.transactionId)}
          </p>
          <p className="mb-0">
            <strong>
              {details.txnSuccess ? "Sent" : "Failed to send"} {details.amount}{" "}
              {details.ticker} to
            </strong>
            : {details.receiver}
          </p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Status;
