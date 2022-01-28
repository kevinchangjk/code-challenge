const {ethers} = require("ethers");
const Balances = require("./build/contracts/Balances.json");

const ADDR = "0x32807CdFe789Ea5F2fABbBcf3C37c61BD4125fDa";   // your contract address
const ABI = Balances.abi;    // your contract ABI

const ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // random wallet 
const TOKENS = [
  "0xff67881f8d12f372d91baae9752eb3631ff0ed00",
  "0x0531ca5a97db8e6b4b9a5ed78d7b52991b6b24d9",
  "0x914769032dbe23c1b11eb085505b4dec762c38b5",
  "0x941a7f0623dba6530b9588eb2ac7cdddfcb41880",
  "0x0b2d7e7e443e695d23138c91a7e81534bc5aefc7"
];

const provider = ethers.providers.getDefaultProvider("ropsten");

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);

  const balances = await contract.getBalances(ADDRESS, TOKENS);

	return balances;
};

test().then(console.log);
