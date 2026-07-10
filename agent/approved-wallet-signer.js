// Approved wallet signing interface
// Designed for external wallet approval (hardware wallet, WalletConnect, or browser wallet).
// The agent prepares transactions; the wallet owner approves the signature.

async function requestWalletApproval(transaction) {
  if (process.env.AGENT_SIGNING_APPROVED !== "true") {
    throw new Error("Wallet approval not enabled");
  }

  console.log("Transaction awaiting wallet approval:", transaction);
  console.log("Use your connected wallet to review and sign.");

  return {
    status: "awaiting_wallet_signature",
    transaction
  };
}

module.exports = requestWalletApproval;
