require('dotenv').config();
const { ethers } = require('ethers');

// This script prepares checks for contracts that expose ownership transfer
// and withdrawal functions. It does not sign or broadcast transactions.

const OWNERSHIP_ABI = [
  'function owner() view returns (address)',
  'function transferOwnership(address newOwner)',
  'function withdrawTo(address payable withdrawAddress,uint256 amount)'
];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, OWNERSHIP_ABI, provider);

  console.log({
    currentOwner: await contract.owner(),
    newOwner: process.env.NEW_OWNER,
    withdrawAddress: process.env.WITHDRAW_ADDRESS
  });
}

main().catch(console.error);
