const { ethers, upgrades, network } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log(`Network: ${network.name}`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

  const Factory = await ethers.getContractFactory("TreeAgeCalculatorUpgradeable");
  const proxy = await upgrades.deployProxy(Factory, [deployer.address], { kind: "uups" });
  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log(`Proxy: ${proxyAddress}`);
  console.log(`Implementation: ${implementationAddress}`);
  console.log("Use the proxy address for application calls and future upgrades.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
