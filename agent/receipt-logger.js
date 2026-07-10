const fs = require("fs");

function logReceipt(receipt) {
  const data = {
    hash: receipt.hash,
    blockNumber: receipt.blockNumber,
    status: receipt.status,
    timestamp: new Date().toISOString()
  };

  fs.appendFileSync("agent-receipts.jsonl", JSON.stringify(data) + "\n");
  return data;
}

module.exports = logReceipt;
