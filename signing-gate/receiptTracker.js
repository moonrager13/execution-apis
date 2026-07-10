export function createReceiptTracker() {
  return {
    recordSubmitted(txHash) {
      return { status: 'submitted', txHash };
    },
    recordConfirmed(receipt) {
      return { status: 'confirmed', receipt };
    }
  };
}
