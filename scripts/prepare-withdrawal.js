const fs = require("fs");
const path = require("path");

const NETWORK = "base";
const DESTINATION = "0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3";
const AMOUNT_ETH = "10";
const AMOUNT_WEI = "10000000000000000000";
const OUTPUT = path.join(__dirname, "..", "withdrawal-requests", "base-10-eth.json");

function prepare() {
  const request = {
    status: "prepared_not_executed",
    network: NETWORK,
    chainId: 8453,
    asset: "ETH",
    amountEth: AMOUNT_ETH,
    amountWei: AMOUNT_WEI,
    destination: DESTINATION,
    requiresSignerApproval: true,
    autoExecute: false,
    execution: "NOT_EXECUTED",
    note: "Prepared withdrawal request only. No transaction is signed or broadcast by this script."
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(request, null, 2) + "\n");
  console.log(`Prepared ${AMOUNT_ETH} ETH Base withdrawal request at ${OUTPUT}`);
  console.log("No transaction was signed or broadcast.");
  return request;
}

if (require.main === module) prepare();

module.exports = { prepare };
