import executionAbi from "./abi/Execution.json" with { type: "json" };

export const CONTRACTS = {
  base: {
    rpc: process.env.BASE_RPC_URL || "https://mainnet.base.org",
    abi: executionAbi,
    addresses: {
      executionContract: process.env.BASE_EXECUTION_CONTRACT || ""
    }
  }
};

export function getContractConfig(network = "base") {
  return CONTRACTS[network];
}
