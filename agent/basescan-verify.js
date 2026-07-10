require("dotenv").config();

console.log({
  network: "base",
  contract: process.env.AGENT_EXECUTOR_ADDRESS,
  command: "npx hardhat verify --network base <address>"
});
