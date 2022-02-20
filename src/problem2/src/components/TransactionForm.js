import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Form,
  FloatingLabel,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { Transaction, Account, randomTxnId, bscScan } from "./formObjects.js";
import Confirmation from "./Confirmation.js";
import Status from "./Status.js";

function TransactionForm(props) {
  const [account, setAccount] = props.accountState;
  const [formDetails, setFormDetails] = useState({});
  const [txnDetails, setTxnDetails] = useState({});
  const [validated, setValidated] = useState({
    address: true,
    amount: true,
  });

  // default handler for the form
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDetails((values) => ({ ...values, [name]: value }));
  };

  // handlers for input validation
  const isAddressValid = (event) => {
    const address = event.target.value;
    if (address.slice(0, 2) === "0x" && address.length == 42) {
      setValidated((validated) => ({ ...validated, ["address"]: true }));
      handleChange(event);
    } else {
      setValidated((validated) => ({ ...validated, ["address"]: false }));
    }
  };

  const isAmountValid = (event) => {
    let valid = false;
    const amount = event.target.value;
    if (amount == "") {
      valid = true;
    } else if (amount > 0) {
      if (formDetails.token == null) {
        valid = true;
      } else {
        if (amount <= account.findToken(formDetails.token).balance) {
          valid = true;
        }
      }
    }

    if (valid) {
      setValidated((validated) => ({ ...validated, ["amount"]: true }));
      handleChange(event);
    } else {
      setValidated((validated) => ({ ...validated, ["amount"]: false }));
    }
  };

  // confirmation modal to be displayed upon transaction submission
  const [cfmModalOpen, setCfmModalOpen] = useState(false);

  const openCfmModal = () => {
    setCfmModalOpen(true);
  };

  const closeCfmModal = () => {
    setCfmModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    for (const criteria in validated) {
      valid &= validated[criteria];
    }
    if (valid) {
      openCfmModal();
    }
  };

  // status modal to be displayed upon confirming transaction
  const [statusOpen, setStatusOpen] = useState(false);

  const openStatus = () => {
    setStatusOpen(true);
  };

  const closeStatus = () => {
    setStatusOpen(false);
  };

  // handler carried on from main app to update account state
  const confirmTxn = () => {
    const txnSuccess = Math.random() < 0.3 ? false : true;
    const token = account.findToken(formDetails.token);
    const txn = new Transaction(
      randomTxnId(),
      txnSuccess,
      account.address,
      formDetails.receiver,
      token.ticker,
      token.address,
      formDetails.amount
    );
    setTxnDetails(txn);
    if (txnSuccess) {
      const newAccount = new Account();
      newAccount.address = account.address;
      newAccount.tokens = account.tokens;
      newAccount.history = account.history;
      token.balance -= formDetails.amount;
      newAccount.addTransaction(txn);
      setAccount(newAccount);
    }
    closeCfmModal();
    openStatus();
  };

  // displays tokens in wallet in a dropdown
  const tokenDropdown = (tokens) => {
    return (
      <Form.Select
        aria-label="Select Token"
        onChange={handleChange}
        name="token"
        required
      >
        <option>{null}</option>
        {tokens.map((token) => {
          if (token.balance <= 0) {
            return null;
          }
          return <option value={token.ticker}>{token.ticker}</option>;
        })}
      </Form.Select>
    );
  };

  return (
    <Container className="Form">
      <Row class="FormHeader">
        <h1>Transaction Form</h1>
        <hr />
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Row md>
            <Form.Group className="mb-3" controlId="receiverAddress">
              <FloatingLabel
                controlId="labelReceiver"
                className="FloatingLabel"
                label="Receiving Wallet Address"
              >
                <Form.Control
                  type="text"
                  name="receiver"
                  placeholder="Receiver address"
                  required
                  onChange={isAddressValid}
                  aria-label="Receiver Address"
                />
              </FloatingLabel>
              <Alert
                className="mb-0"
                variant="danger"
                show={!validated.address}
              >
                Invalid address!
              </Alert>
            </Form.Group>
          </Row>
          <Row md>
            <Form.Group className="mb-3" controlId="token">
              <FloatingLabel
                className="FloatingLabel"
                controlId="labelToken"
                label="Token to Send"
              >
                {tokenDropdown(account.tokens)}
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row md>
            <Form.Group className="mb-3" controlId="amount">
              <InputGroup>
                <FloatingLabel
                  className="FloatingLabel"
                  controlId="labelAmount"
                  label="Transaction Amount"
                >
                  <Form.Control
                    type="text"
                    inputmode="numeric"
                    name="amount"
                    placeholder="Enter the amount of tokens to send"
                    required
                    onChange={isAmountValid}
                    aria-label="Transaction Amount"
                  />
                </FloatingLabel>
                <Alert
                  className="mb-0"
                  variant="danger"
                  show={!validated.amount}
                >
                  Invalid amount!
                </Alert>
              </InputGroup>
            </Form.Group>
          </Row>
          <Button
            className="mt-0"
            variant="primary"
            type="submit"
            style={{ width: "20%" }}
          >
            Send
          </Button>
        </Form>
      </Row>
      <Row>
        <Confirmation
          handleOpen={cfmModalOpen}
          rejectTxn={closeCfmModal}
          confirmTxn={confirmTxn}
          details={formDetails}
        />
      </Row>
      <Row>
        <Status
          handleOpen={statusOpen}
          handleClose={closeStatus}
          details={txnDetails}
        />
      </Row>
    </Container>
  );
}

export default TransactionForm;
