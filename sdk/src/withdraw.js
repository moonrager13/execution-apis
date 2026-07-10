import { ethers } from "ethers";

const ABI = [
  "function withdrawTo(address payable recipient,uint256 amount) external"
];

export async function withdrawTo({ wallet, contractAddress, recipient, amount }) {
  if (!wallet) throw new Error("Wallet signer required");
  const contract = new ethers.Contract(contractAddress, ABI, wallet);
  return await contract.withdrawTo(recipient, amount);
}
