const { ethers, upgrades, network } = require("hardhat");

const EXPECTED_CHAIN_IDS = {
  sepolia: 11155111n,
  mainnet: 1n,
};

function required(name) {
  if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
  return process.env[name];
}

async function main() {
  if (!EXPECTED_CHAIN_IDS[network.name]) {
    throw new Error(`Refusing deployment on unsupported network: ${network.name}`);
  }

  required(network.name === "sepolia" ? "SEPOLIA_RPC_URL" : "MAINNET_RPC_URL");
  required("DEPLOYER_PRIVATE_KEY");

  if (network.name === "mainnet" && process.env.CONFIRM_MAINNET_DEPLOYMENT !== "I_UNDERSTAND") {
    throw new Error("Mainnet deployment requires CONFIRM_MAINNET_DEPLOYMENT=I_UNDERSTAND.");
  }

  const [deployer] = await ethers.getSigners();
  const { chainId } = await ethers.provider.getNetwork();
  const expectedChainId = EXPECTED_CHAIN_IDS[network.name];

  if (chainId !== expectedChainId) {
    throw new Error(`Wrong chain ID: connected to ${chainId}, expected ${expectedChainId}.`);
  }

  const balance = await ethers.provider.getBalance(deployer.address);
  const minBalance = ethers.parseEther(process.env.MIN_DEPLOYER_BALANCE_ETH || "0.01");

  if (balance < minBalance) {
    throw new Error(
      `Insufficient deployer balance: ${ethers.formatEther(balance)} ETH; ` +
      `minimum configured balance is ${ethers.formatEther(minBalance)} ETH.`
    );
  }

  const expectedOwner = process.env.EXPECTED_OWNER_ADDRESS;
  if (expectedOwner && (!ethers.isAddress(expectedOwner) || expectedOwner.toLowerCase() !== deployer.address.toLowerCase())) {
    throw new Error("EXPECTED_OWNER_ADDRESS does not match the deployer address.");
  }

  console.log(`Network: ${network.name}`);
  console.log(`Chain ID: ${chainId}`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

  const Factory = await ethers.getContractFactory("TreeAgeCalculatorUpgradeable");
  const proxy = await upgrades.deployProxy(Factory, [deployer.address], { kind: "uups" });
  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
  const owner = await proxy.owner();

  if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
    throw new Error("Post-deployment owner does not match deployer.");
  }

  console.log(`Proxy: ${proxyAddress}`);
  console.log(`Implementation: ${implementationAddress}`);
  console.log(`Owner: ${owner}`);
  console.log("Use the proxy address for application calls and future upgrades.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
