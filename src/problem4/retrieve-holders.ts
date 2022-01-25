import { ethers } from "ethers";

const swthContract: string = "0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c";
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/");
const wallets: string[] = [
  "0x123d475e13aa54a43a7421d94caa4459da021c77",
  "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
  "0xfe808b079187cc460f47374580f5fb47c82b87a5"
];
const abi = [
  "function balanceOf(address) view returns (uint256)",
];

// implemented in parseBalance to obtain actual value
interface BigNumber {
  _hex: string;
  _isBigNumber: boolean;
}

// extracts hex number, then converts to decimal
var parseBalance = function (balance: BigNumber): number {
  const DECIMALS: number = 1/100000000;
  const res: number = parseInt(balance._hex, 16)*DECIMALS;
  return res;
}

async function main() {
  const query = new ethers.Contract(swthContract, abi, provider);
  for (const wallet of wallets) {
    const balance: BigNumber = await query.balanceOf(wallet);
    const amt: number = parseBalance(balance);
    console.log(wallet+" "+amt);
  }
}

main();
