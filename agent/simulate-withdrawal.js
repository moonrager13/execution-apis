require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL || "https://mainnet.base.org");
const abi = ["function withdrawTo(uint256 amount) external"];

async function main() {
  const contract = new ethers.Contract(process.env.AGENT_EXECUTOR_ADDRESS, abi, provider);
  const amount = process.env.WITHDRAW_AMOUNT_WEI;

  if (!amount) throw new Error("WITHDRAW_AMOUNT_WEI required");

  const data = contract.interface.encodeFunctionData("withdrawTo", [amount]);
  const result = await provider.call({
    to: process.env.AGENT_EXECUTOR_ADDRESS,
    data
  });

  console.log("Simulation successful", result);
}

main().catch(console.error);
