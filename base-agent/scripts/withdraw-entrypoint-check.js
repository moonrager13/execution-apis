require('dotenv').config();
const { ethers } = require('ethers');

const ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function withdrawTo(address payable withdrawAddress,uint256 withdrawAmount)'
];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
  const entryPoint = new ethers.Contract(process.env.ENTRYPOINT_ADDRESS, ABI, provider);

  const account = process.env.DEPOSIT_ACCOUNT;
  const recipient = process.env.WITHDRAW_ADDRESS;

  const balance = await entryPoint.balanceOf(account);

  console.log({
    entryPoint: process.env.ENTRYPOINT_ADDRESS,
    account,
    recipient,
    depositWei: balance.toString()
  });
}

main().catch(console.error);
