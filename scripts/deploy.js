// Hardhat deployment script for AgentExecutor

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const AgentExecutor = await hre.ethers.getContractFactory("AgentExecutor");
  const executor = await AgentExecutor.deploy();
  await executor.waitForDeployment();

  const address = await executor.getAddress();
  console.log("AgentExecutor deployed:", address);

  return address;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
