const fs = require("fs");

const deployment = {
  network: process.env.HARDHAT_NETWORK || "base",
  address: process.env.CONTRACT_ADDRESS || ""
};

fs.writeFileSync(
  "deployment.json",
  JSON.stringify(deployment, null, 2)
);

console.log("Saved deployment.json");
