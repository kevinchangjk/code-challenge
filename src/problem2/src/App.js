import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Account } from "./components/formObjects.js";
import TransactionForm from "./components/TransactionForm.js";
import AccountDetails from "./components/AccountDetails.js";
import "./App.css";

function App() {
  const exampleAccount = new Account();
  const [account, setAccount] = useState(exampleAccount);
  const accountState = [account, setAccount];

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <TransactionForm accountState={accountState} />
          </Col>
          <Col>
            <AccountDetails account={account} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
