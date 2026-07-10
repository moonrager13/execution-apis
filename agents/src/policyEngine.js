const POLICY = {
  destination: "0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3",
  allowedActions: [
    "depositTo",
    "withdrawTo",
    "transferFundsTo"
  ],
  approved: true
};

export function validatePolicy(request) {
  if (!POLICY.approved) throw new Error("Policy disabled");

  if (!POLICY.allowedActions.includes(request.type)) {
    throw new Error("Function not allowed");
  }

  return {
    approved: true,
    destination: POLICY.destination,
    function: request.type,
    request
  };
}
