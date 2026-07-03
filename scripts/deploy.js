// Hardhat deployment script for Paymaster contract

const hre = require("hardhat");

async function main() {
  console.log("Starting Paymaster contract deployment...");

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);
  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

  console.log("\nDeploying Paymaster...");
  const Paymaster = await ethers.getContractFactory("Paymaster");
  const paymaster = await Paymaster.deploy();
  await paymaster.deployed();
  console.log(`Paymaster deployed to: ${paymaster.address}`);

  const paymasterAddress = await paymaster.getPaymasterAddress();
  console.log(`Configured Paymaster Address: ${paymasterAddress}`);

  const maxAllowance = await paymaster.getMaxAllowance();
  console.log(`Max Allowance: ${maxAllowance.toString()}`);

  console.log("\nDeploying PaymasterDeployer...");
  const PaymasterDeployer = await ethers.getContractFactory("PaymasterDeployer");
  const paymasterDeployer = await PaymasterDeployer.deploy();
  await paymasterDeployer.deployed();
  console.log(`PaymasterDeployer deployed to: ${paymasterDeployer.address}`);

  const deploymentAddresses = {
    paymaster: paymaster.address,
    paymasterDeployer: paymasterDeployer.address,
    deployedAt: new Date().toISOString(),
    network: hre.network.name,
    deployer: deployer.address
  };

  console.log("\n=== Deployment Summary ===");
  console.log(JSON.stringify(deploymentAddresses, null, 2));

  const fs = require("fs");
  const path = require("path");
  const deploymentPath = path.join(__dirname, `../deployments/${hre.network.name}.json`);
  const deploymentDir = path.dirname(deploymentPath);

  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }

  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentAddresses, null, 2));
  console.log(`\nDeployment addresses saved to: ${deploymentPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
