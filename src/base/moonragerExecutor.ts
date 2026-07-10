import { createPublicClient, createWalletClient, http, parseAbi } from 'viem';
import { base } from 'viem/chains';
import 'dotenv/config';

const treasuryAbi = parseAbi([
  'function withdrawToBaseAccount(uint256 amount) external',
  'function balance() view returns (uint256)'
]);

const contractAddress = process.env.MOONRAGER_TREASURY as `0x${string}`;
const baseAccount = process.env.BASE_ACCOUNT_ADDRESS as `0x${string}`;

export const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.BASE_RPC_URL)
});

/**
 * Builds a controlled withdrawal request for the MoonRager treasury.
 * The contract should enforce that only the configured Base Account can receive funds.
 */
export async function prepareWithdrawal(amount: bigint) {
  if (!contractAddress || !baseAccount) {
    throw new Error('Missing MOONRAGER_TREASURY or BASE_ACCOUNT_ADDRESS');
  }

  return {
    account: baseAccount,
    address: contractAddress,
    abi: treasuryAbi,
    functionName: 'withdrawToBaseAccount' as const,
    args: [amount] as const
  };
}

export async function getTreasuryBalance() {
  return publicClient.readContract({
    address: contractAddress,
    abi: treasuryAbi,
    functionName: 'balance'
  });
}
