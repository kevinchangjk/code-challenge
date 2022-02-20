import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroupItem, Accordion } from "react-bootstrap";
import { bscScan } from "./formObjects.js";

function AccountDetails(props) {
  const account = Object.assign(props.account);

  function displayToken(token) {
    if (token.balance > 0) {
      return (
        <p className="mb-0">
          <strong>{bscScan(token.address, "address", token.ticker)}</strong>:{" "}
          {token.balance}
        </p>
      );
    } else {
      return null;
    }
  }

  function displayHistory(history) {
    let id = 0;

    function displayTransaction(transaction) {
      return (
        <Accordion.Item eventKey={id++} className="Transaction">
          <Accordion.Header>
            <strong>{transaction.datetime}</strong>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              <strong>Transaction ID</strong>:{" "}
              {bscScan(
                transaction.transactionId,
                "tx",
                transaction.transactionId
              )}
            </p>
            <p>
              <strong>To</strong>: {transaction.receiver}
            </p>
            <p className="mb-0">
              <strong>
                {transaction.amount} {transaction.ticker} Sent
              </strong>
            </p>
          </Accordion.Body>
        </Accordion.Item>
      );
    }

    if (history.length > 0) {
      return <Accordion>{history.map(displayTransaction)}</Accordion>;
    } else {
      return (
        <Card.Text>
          <strong>No Transactions Yet</strong>
        </Card.Text>
      );
    }
  }

  return (
    <Card className="Account">
      <Card.Header className="text-center" as="h4">
        Your Account
      </Card.Header>
      <Card.Body style={{ padding: "0rem" }}>
        <ListGroupItem>
          <Card.Title className="mb-0" as="h5">
            <em>Binance Smart Chain Mainnet</em>
          </Card.Title>
        </ListGroupItem>
        <ListGroupItem>
          <Card.Text as="h5">Wallet Address</Card.Text>
          <Card.Text>
            {bscScan(account.address, "address", account.address)}
          </Card.Text>
        </ListGroupItem>
        <ListGroupItem>
          <Card.Text as="h5">Token Balances</Card.Text>
          <Card.Text>{account.tokens.map(displayToken)}</Card.Text>
        </ListGroupItem>
        <ListGroupItem>
          <Card.Text as="h5">
            Transaction History <em>(Most recent 3)</em>
          </Card.Text>
          <hr />
          {displayHistory(account.history)}
        </ListGroupItem>
      </Card.Body>
    </Card>
  );
}

export default AccountDetails;
