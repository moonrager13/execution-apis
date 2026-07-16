// Hardhat deployment script for AgentExecutor

const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const network = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();

  if (!deployer) throw new Error("No deployer wallet configured");

  const AgentExecutor = await hre.ethers.getContractFactory("AgentExecutor");
  const executor = await AgentExecutor.deploy();
  await executor.waitForDeployment();

  const address = await executor.getAddress();

  const record = {
    network,
    contract: "AgentExecutor",
    address,
    destination: process.env.DESTINATION_ADDRESS || null,
    deployer: deployer.address,
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    `deployment-${network}.json`,
    JSON.stringify(record, null, 2)
  );

  console.log(record);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
