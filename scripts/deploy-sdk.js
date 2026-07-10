const hre = require("hardhat");

async function main() {
  console.log("Deployment target:", hre.network.name);
  // Add contract deployment factory here
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
