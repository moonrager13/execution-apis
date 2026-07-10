import { readFileSync } from "fs";

/**
 * Minimal execution agent controller.
 *
 * The agent prepares actions and requires an external signer/approval layer.
 */

const config = JSON.parse(readFileSync("./agents/config.example.json", "utf8"));

export function getAgentConfig() {
  return config;
}

export async function prepareTransaction(action) {
  if (!config.allowedActions.includes(action.type)) {
    throw new Error("Action not allowed");
  }

  return {
    status: "ready_for_approval",
    action,
    signer: config.signer,
    network: config.network
  };
}

console.log("Execution agent initialized");
