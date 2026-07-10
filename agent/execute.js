require("dotenv").config();

const validateTransaction = require("./transaction-guard");
const loadDeployment = require("./deployment-loader");
const audit = require("./audit-log");

async function run() {
  console.log("Starting Base execution agent...");

  const deployment = loadDeployment();

  const request = {
    network: "base",
    contractAddress: deployment.contractAddress || deployment.address,
    recipient: process.env.DESTINATION_ADDRESS,
    amount: process.env.WITHDRAW_AMOUNT_WEI
  };

  validateTransaction({
    amount: request.amount,
    destination: request.recipient
  });

  audit("withdrawal_prepared", request);

  return {
    status: "awaiting_approval",
    request
  };
}

module.exports = { run };

run().catch(console.error);
