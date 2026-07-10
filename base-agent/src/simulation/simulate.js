import { getProvider } from '../chain/provider.js';

export async function simulateTransaction(tx) {
  const provider = getProvider();

  const gasEstimate = await provider.estimateGas({
    to: tx.to,
    data: tx.data,
    value: tx.value || '0x0'
  });

  return {
    simulation: true,
    gasEstimate: gasEstimate.toString(),
    transaction: tx
  };
}
