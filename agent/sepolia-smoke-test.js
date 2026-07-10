require("dotenv").config();
const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC_URL);
  const network = await provider.getNetwork();
  console.log("Connected chain:", network.chainId.toString());
}

main().catch(console.error);
