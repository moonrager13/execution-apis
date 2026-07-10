const fs = require("fs");

const network = process.env.NETWORK || "unknown";
const address = process.env.CONTRACT_ADDRESS;

if (!address) {
  throw new Error("CONTRACT_ADDRESS is required");
}

const file = "deployments.json";
const deployments = fs.existsSync(file)
  ? JSON.parse(fs.readFileSync(file))
  : {};

deployments[network] = {
  contract: "AgentExecutor",
  address,
  timestamp: new Date().toISOString()
};

fs.writeFileSync(file, JSON.stringify(deployments, null, 2));
console.log("Saved deployment:", deployments[network]);
