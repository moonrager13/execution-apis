import { ethers } from "ethers";
import { getContractConfig } from "./contracts.js";
import { loadDeployment } from "./deployment.js";

export async function withdrawTo({
  wallet,
  network = "base",
  contractAddress,
  recipient,
  amount
}) {
  if (!wallet) throw new Error("Wallet signer required");

  const config = getContractConfig(network);
  const deployment = contractAddress
    ? { contractAddress }
    : loadDeployment(network);

  const address = deployment.contractAddress || deployment.address || config.addresses.executionContract;

  if (!address) {
    throw new Error(`Missing execution contract address for ${network}`);
  }

  const contract = new ethers.Contract(address, config.abi, wallet);

  return await contract.withdrawTo(recipient, amount);
}
