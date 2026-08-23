const { ethers, upgrades } = require("hardhat");

// Fill this in when you actually have a fix/new version ready.
// This is the address of the PROXY (not the implementation) from your
// original deployment — the one users actually interact with.
const PROXY_ADDRESS = "0xYOUR_PROXY_ADDRESS_HERE";

async function main() {
  if (PROXY_ADDRESS === "0xYOUR_PROXY_ADDRESS_HERE") {
    throw new Error("Set PROXY_ADDRESS to your deployed proxy address before running this.");
  }

  // Point this at whatever your new/fixed contract is called.
  // It must be storage-layout compatible with the previous version
  // (e.g. don't reorder, remove, or change the type of existing state
  // variables). The upgrades plugin will check this automatically and
  // refuse to proceed if it detects an unsafe change.
  const TreeAgeCalculatorUpgradeableV2 = await ethers.getContractFactory(
    "TreeAgeCalculatorUpgradeableV2"
  );

  console.log("Upgrading proxy at:", PROXY_ADDRESS);

  const upgraded = await upgrades.upgradeProxy(
    PROXY_ADDRESS,
    TreeAgeCalculatorUpgradeableV2
  );

  await upgraded.waitForDeployment();

  console.log(
    "New implementation deployed to:",
    await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS)
  );
  console.log("Proxy address (unchanged):", PROXY_ADDRESS);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
