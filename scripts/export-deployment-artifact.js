const fs = require("fs");

const deployment = {
  network: process.env.HARDHAT_NETWORK || "base",
  contractAddress: process.env.CONTRACT_ADDRESS || process.env.BASE_EXECUTION_CONTRACT || "",
  timestamp: new Date().toISOString()
};

fs.mkdirSync("deployments", { recursive: true });
fs.writeFileSync(
  `deployments/${deployment.network}.json`,
  JSON.stringify(deployment, null, 2)
);

console.log(`Saved deployments/${deployment.network}.json`);
