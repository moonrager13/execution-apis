const hre = require('hardhat');

async function main() {
  const Factory = await hre.ethers.getContractFactory('BaseAgentVault');
  const contract = await Factory.deploy();
  await contract.waitForDeployment();
  console.log(await contract.getAddress());
}

main().catch(console.error);
