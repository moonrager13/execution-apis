require("dotenv").config();

const validateTransaction = require("./transaction-guard");
const loadDeployment = require("./deployment-loader");
const audit = require("./audit-log");

async function run() {
  console.log("Starting Base execution agent...");

  const deployment = loadDeployment();

  const request = {
    network: process.env.NETWORK || "base",
    contractAddress: deployment.contractAddress || deployment.address,
    recipient: process.env.DESTINATION_ADDRESS,
    amount: process.env.WITHDRAW_AMOUNT_WEI
  };

  validateTransaction({
    amount: request.amount,
    destination: request.recipient
  });

  audit("withdrawal_checked", request);

  const autoExecute = process.env.AUTO_EXECUTE === "true";

  if (!autoExecute) {
    return {
      status: "awaiting_approval",
      request
    };
  }

  audit("withdrawal_ready_for_executor", request);

  return {
    status: "ready_for_protected_executor",
    request
  };
}

module.exports = { run };

run().catch(console.error);
