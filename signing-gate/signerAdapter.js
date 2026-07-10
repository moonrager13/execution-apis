function createSignerRequest(payload) {
  return {
    type: "SIGN_TRANSACTION",
    payload,
    requiresSignerApproval: true
  };
}

module.exports = { createSignerRequest };
