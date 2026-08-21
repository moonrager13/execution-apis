const { ethers, upgrades, network } = require("hardhat");

const PROXY_ADDRESS = process.env.PROXY_ADDRESS;
const EXPECTED_CHAIN_IDS = { sepolia: 11155111n, mainnet: 1n };

async function main() {
  if (!EXPECTED_CHAIN_IDS[network.name]) {
    throw new Error(`Refusing upgrade on unsupported network: ${network.name}`);
  }
  if (!PROXY_ADDRESS || !ethers.isAddress(PROXY_ADDRESS)) {
    throw new Error("Set PROXY_ADDRESS to the deployed UUPS proxy address.");
  }
  if (network.name === "mainnet" && process.env.CONFIRM_MAINNET_DEPLOYMENT !== "I_UNDERSTAND") {
    throw new Error("Mainnet upgrade requires CONFIRM_MAINNET_DEPLOYMENT=I_UNDERSTAND.");
  }

  const [signer] = await ethers.getSigners();
  const { chainId } = await ethers.provider.getNetwork();
  if (chainId !== EXPECTED_CHAIN_IDS[network.name]) {
    throw new Error(`Wrong chain ID: connected to ${chainId}, expected ${EXPECTED_CHAIN_IDS[network.name]}.`);
  }

  const current = await ethers.getContractAt("TreeAgeCalculatorUpgradeable", PROXY_ADDRESS);
  const owner = await current.owner();
  const implementationBefore = await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS);

  console.log(`Network: ${network.name}`);
  console.log(`Chain ID: ${chainId}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Proxy: ${PROXY_ADDRESS}`);
  console.log(`Current owner: ${owner}`);
  console.log(`Current implementation: ${implementationBefore}`);

  if (owner.toLowerCase() !== signer.address.toLowerCase()) {
    throw new Error("The signing account is not the proxy owner.");
  }

  const V2 = await ethers.getContractFactory("TreeAgeCalculatorUpgradeableV2");
  const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, V2);
  await upgraded.waitForDeployment();

  const implementationAfter = await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS);
  const finalOwner = await upgraded.owner();

  if (implementationAfter.toLowerCase() === implementationBefore.toLowerCase()) {
    throw new Error("Implementation address did not change after upgrade.");
  }
  if (finalOwner.toLowerCase() !== owner.toLowerCase()) {
    throw new Error("Proxy owner changed unexpectedly during upgrade.");
  }
  if ((await upgraded.version()) !== 2n) {
    throw new Error("V2 version check failed after upgrade.");
  }

  console.log(`New implementation: ${implementationAfter}`);
  console.log(`Proxy unchanged: ${await upgraded.getAddress()}`);
  console.log(`V2 version: ${await upgraded.version()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
