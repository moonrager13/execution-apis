const hre = require("hardhat");

async function main() {
  const address = process.env.CONTRACT_ADDRESS;

  if (!address) {
    throw new Error("Set CONTRACT_ADDRESS");
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
