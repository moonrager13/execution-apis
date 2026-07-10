import { readFileSync } from "fs";
import { validatePolicy } from "./policyEngine.js";

const config = JSON.parse(readFileSync("./agents/config.example.json", "utf8"));

export function getAgentConfig() {
  return config;
}

export async function prepareTransaction(action) {
  const policy = validatePolicy(action);

  return {
    status: "ready_for_approval",
    contractFunction: policy.function,
    destination: policy.destination,
    action,
    signer: config.signer,
    network: config.network
  };
}

console.log("Transfer execution agent initialized");
