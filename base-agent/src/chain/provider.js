import { JsonRpcProvider } from 'ethers';

export function getProvider() {
  return new JsonRpcProvider(process.env.BASE_RPC_URL || 'https://mainnet.base.org');
}
