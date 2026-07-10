// Hardhat deployment script for AgentExecutor

const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const network = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();

  const AgentExecutor = await hre.ethers.getContractFactory("AgentExecutor");
  const executor = await AgentExecutor.deploy();
  await executor.waitForDeployment();

  const address = await executor.getAddress();

  const record = {
    network,
    contract: "AgentExecutor",
    address,
    destination: "0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3",
    deployer: deployer.address,
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    `deployment-${network}.json`,
    JSON.stringify(record, null, 2)
  );

  fs.writeFileSync(
    "agent-deployment-base.json",
    JSON.stringify(record, null, 2)
  );

  console.log(record);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
