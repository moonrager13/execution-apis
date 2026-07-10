const fs = require("fs");

function loadDeployment() {
  if (!fs.existsSync("agent-deployment-base.json")) {
    throw new Error("No Base deployment found");
  }
  return JSON.parse(fs.readFileSync("agent-deployment-base.json"));
}

module.exports = loadDeployment;
