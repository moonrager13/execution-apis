const fs = require("fs");

const artifact = require("../artifacts/contracts/AgentExecutor.sol/AgentExecutor.json");

fs.mkdirSync("abi", { recursive: true });
fs.writeFileSync("abi/AgentExecutor.json", JSON.stringify(artifact.abi, null, 2));

console.log("ABI exported");
