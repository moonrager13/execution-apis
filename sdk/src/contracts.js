export const CONTRACTS = {
  base: {
    rpc: "https://mainnet.base.org",
    addresses: {
      executionContract: process.env.BASE_EXECUTION_CONTRACT || ""
    }
  }
};

export function getContractConfig(network = "base") {
  return CONTRACTS[network];
}
