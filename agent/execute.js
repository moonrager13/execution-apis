require("dotenv").config();
const validateTransaction = require("./transaction-guard");
const loadDeployment = require("./deployment-loader");
const audit = require("./audit-log");

async function run() {
  console.log("Starting Base execution agent...");

  const deployment = loadDeployment();
  process.env.AGENT_EXECUTOR_ADDRESS = deployment.address;

  validateTransaction({
    amount: process.env.WITHDRAW_AMOUNT_WEI,
    destination: deployment.destination
  });

  audit("agent_start", deployment);

  require("./approval-flow");
  require("./simulate-withdrawal");
  require("./base-wallet-signer");
  require("./verify-deployment");
}

run().catch(console.error);
