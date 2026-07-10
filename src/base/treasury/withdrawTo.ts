import { ethers } from "ethers";

const TREASURY_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const ABI = [
  "function withdrawTo(address recipient, uint256 amount) external"
];

export async function withdrawTo(
  privateKey: string,
  recipient: string,
  amountEth: string
) {
  if (!ethers.isAddress(recipient)) {
    throw new Error("Invalid recipient address");
  }

  const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
  const wallet = new ethers.Wallet(privateKey, provider);
  const treasury = new ethers.Contract(TREASURY_ADDRESS, ABI, wallet);

  const amount = ethers.parseEther(amountEth);

  const balance = await provider.getBalance(TREASURY_ADDRESS);
  if (balance < amount) {
    throw new Error("Treasury balance is insufficient");
  }

  const tx = await treasury.withdrawTo(recipient, amount);
  await tx.wait();

  return tx.hash;
}
