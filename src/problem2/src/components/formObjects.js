// contains handy classes for use in TransactionForm

class Token {
  constructor(ticker, address, balance) {
    this.ticker = ticker;
    this.address = address;
    this.balance = balance;
  }
}

class Transaction {
  getDatetime() {
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return datetime;
  }

  constructor(
    transactionId,
    txnSuccess,
    sender,
    receiver,
    ticker,
    tokenAddress,
    amount
  ) {
    this.transactionId = transactionId;
    this.txnSuccess = txnSuccess;
    this.sender = sender;
    this.receiver = receiver;
    this.ticker = ticker;
    this.tokenAddress = tokenAddress;
    this.amount = amount;
    this.datetime = this.getDatetime();
  }
}

class Account {
  constructor() {
    this.address = "0x8FbF90036aEfBCfe8e4B6C932944e2815d412835";
    this.tokens = [
      new Token("ETH", "0x2170ed0880ac9a755fd29b2688956bd959f933f8", 10),
      new Token("WBNB", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 100),
      new Token("BUSD", "0xe9e7cea3dedca5984780bafc599bd69add087d56", 1000),
    ];
    this.history = [];
  }

  addTransaction(transaction) {
    this.history.unshift(transaction);
    if (this.history.length > 3) {
      this.history.pop();
    }
  }

  findToken(token) {
    if (token == null) {
      alert("Error: No token specified");
      return null;
    }
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].ticker === token) {
        return this.tokens[i];
      }
    }
    alert("Error: Specified token not found in wallet");
    return null;
  }
}

function randomTxnId() {
  let res = "0x";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLen = chars.length;
  for (let i = 0; i < 64; i++) {
    res += chars.charAt(Math.floor(Math.random() * charsLen));
  }
  return res;
}

function bscScan(hash, type, placeholder) {
  const url = "https://bscscan.com/" + type + "/" + hash;
  return (
    <a style={{ textDecoration: "none" }} href={url} target="_blank">
      {placeholder}
    </a>
  );
}

export { Token, Transaction, Account, randomTxnId, bscScan };
