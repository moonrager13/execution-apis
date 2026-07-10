// Base wallet signing agent
// Uses a local approved signer. Never store private keys in source control.

require("dotenv").config();
const { ethers } = require("ethers");

const RPC = process.env.BASE_RPC_URL || "https://mainnet.base.org";
const CONTRACT = process.env.AGENT_EXECUTOR_ADDRESS;

const ABI = [
  "function withdrawTo(uint256 amount) external",
  "function transferFundsTo(uint256 amount) external"
];

async function main() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY missing. Use a wallet you control.");
  }

  if (!CONTRACT) {
    throw new Error("AGENT_EXECUTOR_ADDRESS missing.");
  }

  const provider = new ethers.JsonRpcProvider(RPC);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Connected wallet:", await signer.getAddress());
  console.log("Network:", await provider.getNetwork());

  const executor = new ethers.Contract(CONTRACT, ABI, signer);

  const amount = process.env.WITHDRAW_AMOUNT_WEI;
  if (!amount) {
    console.log("No withdrawal approved. Set WITHDRAW_AMOUNT_WEI to execute.");
    return;
  }

  console.log("Preparing approved withdrawal:", amount);
  const tx = await executor.withdrawTo(amount);
  console.log("Transaction submitted:", tx.hash);

  await tx.wait();
  console.log("Transaction confirmed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
