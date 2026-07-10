const POLICY = {
  owner: "0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3",
  maxValue: "0",
  approved: true
};

export function validatePolicy(request) {
  if (!POLICY.approved) throw new Error("Policy disabled");
  return { approved: true, owner: POLICY.owner, request };
}
