require("dotenv").config();

const validateTransaction = require("./transaction-guard");
const loadDeployment = require("./deployment-loader");
const audit = require("./audit-log");
const { debug } = require("./debug-log");
const { enforcePolicy } = require("../signing-gate/policyEngine");
const { createApprovalRequest, approve } = require("../signing-gate/approvalQueue");
const { createSignerRequest } = require("../signing-gate/signerAdapter");

async function run() {
  debug("agent_started");
  console.log("Starting Base execution agent...");

  const deployment = loadDeployment();

  const request = {
    network: process.env.NETWORK || "base",
    contractAddress: deployment.contractAddress || deployment.address,
    recipient: process.env.DESTINATION_ADDRESS,
    amount: process.env.WITHDRAW_AMOUNT_WEI
  };

  debug("transaction_request_created", request);

  validateTransaction({
    amount: request.amount,
    destination: request.recipient
  });

  enforcePolicy(request);
  debug("policy_passed", request);

  audit("withdrawal_checked", request);

  const approval = createApprovalRequest(request);

  const autoExecute = process.env.AUTO_EXECUTE === "true";

  if (!autoExecute) {
    return {
      status: "awaiting_approval",
      approval
    };
  }

  const approved = approve(request);
  const signerRequest = createSignerRequest(approved);

  audit("withdrawal_ready_for_executor", signerRequest);
  debug("signer_request_created", signerRequest);

  return {
    status: "ready_for_protected_executor",
    signerRequest
  };
}

module.exports = { run };

run().catch((error) => {
  debug("agent_error", { message: error.message });
  console.error(error);
});
