require("dotenv").config();
const fs = require("fs");

const deployment = {
  network: "base",
  contract: "AgentExecutor",
  address: process.env.AGENT_EXECUTOR_ADDRESS,
  destination: process.env.DESTINATION_ADDRESS,
  verified: false
};

fs.writeFileSync("agent-deployment-base.json", JSON.stringify(deployment, null, 2));
console.log(deployment);
