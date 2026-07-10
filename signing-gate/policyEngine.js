const DEFAULT_LIMIT = BigInt(process.env.MAX_WITHDRAW_WEI || "1000000000000000000");

function enforcePolicy(request) {
  if (!request.network || request.network !== (process.env.ALLOWED_NETWORK || "base")) {
    throw new Error("Network not allowed");
  }

  if (request.amount && BigInt(request.amount) > DEFAULT_LIMIT) {
    throw new Error("Amount exceeds signing policy limit");
  }

  if (process.env.ALLOWED_CONTRACT && request.contractAddress?.toLowerCase() !== process.env.ALLOWED_CONTRACT.toLowerCase()) {
    throw new Error("Contract not approved");
  }

  return true;
}

module.exports = { enforcePolicy };
