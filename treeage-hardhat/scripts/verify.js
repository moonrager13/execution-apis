const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const proxy = process.env.PROXY_ADDRESS;
  if (!proxy || !hre.ethers.isAddress(proxy)) {
    throw new Error("Set PROXY_ADDRESS to the deployed UUPS proxy address.");
  }

  const network = hre.network.name;
  if (network !== "sepolia" && network !== "mainnet") {
    throw new Error(`Verification is only supported for sepolia/mainnet, not ${network}.`);
  }

  console.log(`Verifying UUPS proxy: ${proxy}`);
  await hre.run("verify:verify", { address: proxy });
  console.log("Verification request completed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
