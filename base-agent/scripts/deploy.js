const hre = require('hardhat');

async function main() {
  const Vault = await hre.ethers.getContractFactory('BaseAgentVault');
  const vault = await Vault.deploy();
  await vault.waitForDeployment();
  console.log('BaseAgentVault:', await vault.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
