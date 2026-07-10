export async function simulateTransaction(provider, tx) {
  if (!provider) throw new Error("Provider required");

  return {
    simulated: true,
    transaction: tx
  };
}
