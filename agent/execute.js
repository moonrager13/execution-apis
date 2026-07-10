require("dotenv").config();

async function run() {
  console.log("Starting Base execution agent...");
  require("./approval-flow");
  require("./simulate-withdrawal");
  require("./base-wallet-signer");
  require("./verify-deployment");
}

run().catch(console.error);
