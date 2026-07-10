import fs from "fs";

const destination = "0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3";

export function getContractConfig(network = "base") {
  let deployment;

  try {
    deployment = JSON.parse(fs.readFileSync(`deployment-${network}.json`));
  } catch {
    deployment = null;
  }

  return {
    network,
    address: deployment?.address || null,
    destination,
    functions: ["depositTo", "withdrawTo", "transferFundsTo"]
  };
}
