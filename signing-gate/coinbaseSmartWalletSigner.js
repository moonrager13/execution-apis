// Coinbase Smart Wallet signer adapter
// Keeps agent logic separate from wallet authorization.

export function createCoinbaseSmartWalletSigner(config = {}) {
  return {
    provider: config.provider,
    async signTransaction(request) {
      if (!request?.approved) {
        throw new Error('Approval required before signing');
      }
      return {
        status: 'signature_required',
        request
      };
    }
  };
}
