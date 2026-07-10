import { run } from "hardhat";

async function main() {
  const address = process.env.CONTRACT_ADDRESS;
  if (!address) throw new Error("CONTRACT_ADDRESS missing");

  await run("verify:verify", {
    address,
    constructorArguments: []
  });
}

main().catch(console.error);
