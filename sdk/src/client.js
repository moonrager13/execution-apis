import { ethers } from "ethers";

export function createBaseClient({ rpcUrl, privateKey }) {
  const provider = new ethers.JsonRpcProvider(rpcUrl || "https://mainnet.base.org");
  if (!privateKey) return { provider };
  const wallet = new ethers.Wallet(privateKey, provider);
  return { provider, wallet };
}
