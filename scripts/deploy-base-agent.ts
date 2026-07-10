import { ethers } from "hardhat";

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log(`Connected chain: ${network.chainId}`);
  console.log("Base agent deployment configuration loaded.");
  console.log("Run verification after deploying contracts.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
