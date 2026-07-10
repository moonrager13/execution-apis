const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const address = process.env.BASE_EXECUTION_CONTRACT || process.env.CONTRACT_ADDRESS;

  if (!address) {
    throw new Error("Set BASE_EXECUTION_CONTRACT or CONTRACT_ADDRESS");
  }

  await hre.run("verify:verify", {
    address,
    constructorArguments: []
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
