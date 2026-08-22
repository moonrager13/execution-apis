require("dotenv").config();

const { Interface } = require("ethers");
const validateTransaction = require("./transaction-guard");
const loadDeployment = require("./deployment-loader");
const audit = require("./audit-log");
const { debug } = require("./debug-log");
const { enforcePolicy, BASE_CHAIN_ID } = require("../signing-gate/policyEngine");
const { createApprovalRequest, approve } = require("../signing-gate/approvalQueue");
const {
  createSignerRequest,
  createCoinbaseSmartWalletSigner,
  submitApprovedWithdrawal
} = require("../signing-gate/signerAdapter");

const WITHDRAW_INTERFACE = new Interface([
  "function withdrawTo(address recipient, uint256 amount)"
]);

function resolveWalletClient(explicitClient) {
  return (
    explicitClient ||
    globalThis.coinbaseSmartWalletClient ||
    globalThis.walletClient ||
    globalThis.ethereum ||
    null
  );
}

function buildWithdrawalCalldata(request) {
  return WITHDRAW_INTERFACE.encodeFunctionData("withdrawTo", [
    request.recipient,
    BigInt(request.amountWei)
  ]);
}

async function run(options = {}) {
  debug("agent_started");
  console.log("Starting Base execution agent...");

  const deployment = loadDeployment();

  const request = {
    network: process.env.NETWORK || "base",
    chainId: Number(process.env.BASE_CHAIN_ID || BASE_CHAIN_ID),
    contractAddress: deployment.contractAddress || deployment.address,
    recipient: process.env.DESTINATION_ADDRESS,
    amount: process.env.WITHDRAW_AMOUNT_WEI,
    amountWei: process.env.WITHDRAW_AMOUNT_WEI,
    functionName: process.env.ALLOWED_FUNCTION || "withdrawTo"
  };

  debug("withdrawal_request_created", request);

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
  const walletClient = resolveWalletClient(options.walletClient);
  const signer = createCoinbaseSmartWalletSigner(walletClient, {
    chainId: request.chainId,
    account: options.account
  });

  const signerRequest = createSignerRequest({
    ...approved,
    calldata: options.calldata || buildWithdrawalCalldata(request)
  });

  debug("signer_request_created", signerRequest);
  audit("withdrawal_ready_for_executor", signerRequest);

  const execution = await submitApprovedWithdrawal(signer, {
    ...request,
    calldata: signerRequest.payload.calldata,
    value: "0x0"
  });

  audit("withdrawal_submitted", execution);

  return {
    status: execution.status === "confirmed" ? "submitted_and_confirmed" : "submitted",
    signerRequest,
    execution
  };
}

module.exports = { run };

run().catch((error) => {
  debug("agent_error", { message: error.message });
  console.error(error);
});
