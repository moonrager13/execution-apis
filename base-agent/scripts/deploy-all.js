const hre = require('hardhat');

async function deploy(name, args = []) {
  const Factory = await hre.ethers.getContractFactory(name);
  const contract = await Factory.deploy(...args);
  await contract.waitForDeployment();
  console.log(`${name}:`, await contract.getAddress());
  return contract;
}

async function main() {
  await deploy('BaseAgentVault');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
