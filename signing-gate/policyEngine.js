const DEFAULT_LIMIT = BigInt(process.env.MAX_WITHDRAW_WEI || "1000000000000000000");
const BASE_CHAIN_ID = Number(process.env.BASE_CHAIN_ID || 8453);
const ALLOWED_CONTRACT = (process.env.ALLOWED_CONTRACT || "").toLowerCase();
const ALLOWED_RECIPIENT = (process.env.ALLOWED_RECIPIENT || "").toLowerCase();
const ALLOWED_FUNCTION = (process.env.ALLOWED_FUNCTION || "withdrawTo").toLowerCase();

function normalizeAddress(value) {
  return (value || "").toLowerCase();
}

function enforcePolicy(request) {
  if (request.network && request.network !== (process.env.ALLOWED_NETWORK || "base")) {
    throw new Error("Network not allowed");
  }

  if (request.chainId && Number(request.chainId) !== BASE_CHAIN_ID) {
    throw new Error("Chain ID not allowed");
  }

  if (request.amount && BigInt(request.amount) > DEFAULT_LIMIT) {
    throw new Error("Amount exceeds signing policy limit");
  }

  if (ALLOWED_CONTRACT && normalizeAddress(request.contractAddress) !== ALLOWED_CONTRACT) {
    throw new Error("Contract not approved");
  }

  if (ALLOWED_RECIPIENT && normalizeAddress(request.recipient) !== ALLOWED_RECIPIENT) {
    throw new Error("Recipient not approved");
  }

  if (request.functionName && normalizeAddress(request.functionName) !== ALLOWED_FUNCTION) {
    throw new Error("Withdrawal function not approved");
  }

  return true;
}

module.exports = { enforcePolicy, BASE_CHAIN_ID };
