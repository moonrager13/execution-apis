require("dotenv").config();

console.log(`Verify with:\n npx hardhat verify --network base ${process.env.AGENT_EXECUTOR_ADDRESS}`);
