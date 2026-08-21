const { ethers, upgrades, network } = require("hardhat");

const PROXY_ADDRESS = process.env.PROXY_ADDRESS;

async function main() {
  if (!PROXY_ADDRESS || !ethers.isAddress(PROXY_ADDRESS)) {
    throw new Error("Set PROXY_ADDRESS to the deployed UUPS proxy address.");
  }

  const [signer] = await ethers.getSigners();
  const current = await ethers.getContractAt("TreeAgeCalculatorUpgradeable", PROXY_ADDRESS);
  const owner = await current.owner();

  console.log(`Network: ${network.name}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Proxy: ${PROXY_ADDRESS}`);
  console.log(`Current owner: ${owner}`);

  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    throw new Error("The deployer/signing account is not the proxy owner.");
  }

  const V2 = await ethers.getContractFactory("TreeAgeCalculatorUpgradeableV2");
  const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, V2);
  await upgraded.waitForDeployment();

  const implementation = await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS);
  console.log(`New implementation: ${implementation}`);
  console.log(`Proxy unchanged: ${await upgraded.getAddress()}`);
  console.log(`V2 version: ${await upgraded.version()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
