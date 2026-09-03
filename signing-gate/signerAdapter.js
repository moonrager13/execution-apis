const { debug } = require("../agent/debug-log");

function createSignerRequest(payload) {
  return {
    type: "SIGN_TRANSACTION",
    payload,
    requiresSignerApproval: true
  };
}

function resolveWalletClient(explicitClient) {
  return (
    explicitClient ||
    globalThis.coinbaseSmartWalletClient ||
    globalThis.walletClient ||
    globalThis.ethereum ||
    null
  );
}

function createCoinbaseSmartWalletSigner(walletClient, options = {}) {
  const client = resolveWalletClient(walletClient);

  if (!client) {
    throw new Error("Coinbase Smart Wallet client is required for live execution");
  }

  const chainId = Number(options.chainId || process.env.BASE_CHAIN_ID || 8453);
  const account = options.account || client.account?.address || client.selectedAddress || null;

  async function sendTransaction(transaction) {
    if (typeof client.request === "function") {
      const walletSendCalls = {
        method: "wallet_sendCalls",
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            from: account || undefined,
            calls: [
              {
                to: transaction.to,
                data: transaction.data || "0x",
                value: transaction.value || "0x0"
              }
            ]
          }
        ]
      };

      try {
        const callId = await client.request(walletSendCalls);
        debug("coinbase_wallet_send_calls_submitted", { callId, chainId, account });
        return callId;
      } catch (walletSendCallsError) {
        const ethSendTransaction = {
          method: "eth_sendTransaction",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              from: account || undefined,
              to: transaction.to,
              data: transaction.data || "0x",
              value: transaction.value || "0x0"
            }
          ]
        };

        const txHash = await client.request(ethSendTransaction);
        debug("coinbase_eth_send_transaction_submitted", { txHash, chainId, account });
        return txHash;
      }
    }

    if (typeof client.sendTransaction === "function") {
      const txHash = await client.sendTransaction({
        chainId,
        from: account || undefined,
        to: transaction.to,
        data: transaction.data || "0x",
        value: transaction.value || "0x0"
      });
      debug("coinbase_send_transaction_submitted", { txHash, chainId, account });
      return txHash;
    }

    throw new Error("Unsupported Coinbase Smart Wallet client");
  }

  async function getReceipt(txHash) {
    if (!txHash || typeof client.request !== "function") {
      return null;
    }

    try {
      return await client.request({
        method: "eth_getTransactionReceipt",
        params: [txHash]
      });
    } catch (error) {
      debug("coinbase_receipt_lookup_failed", { message: error.message });
      return null;
    }
  }

  return {
    provider: "coinbase-smart-wallet",
    chainId,
    account,
    sendTransaction,
    getReceipt
  };
}

async function submitApprovedWithdrawal(signer, request) {
  const transaction = {
    to: request.contractAddress,
    data: request.calldata || "0x",
    value: request.value || "0x0"
  };

  debug("coinbase_withdrawal_submitting", {
    contractAddress: request.contractAddress,
    recipient: request.recipient,
    amount: request.amount,
    chainId: request.chainId
  });

  const txHash = await signer.sendTransaction(transaction);
  const receipt = typeof signer.getReceipt === "function" ? await signer.getReceipt(txHash) : null;

  const result = {
    txHash,
    receipt,
    status: receipt && receipt.status ? "confirmed" : "submitted"
  };

  debug("coinbase_withdrawal_result", result);
  return result;
}

module.exports = {
  createSignerRequest,
  createCoinbaseSmartWalletSigner,
  submitApprovedWithdrawal
};
