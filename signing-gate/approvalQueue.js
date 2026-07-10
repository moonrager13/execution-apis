const audit = require("../agent/audit-log");

function createApprovalRequest(request) {
  const approval = {
    id: `approval-${Date.now()}`,
    status: "pending",
    request,
    createdAt: new Date().toISOString()
  };

  audit("approval_requested", approval);
  return approval;
}

function approve(request) {
  const result = { ...request, status: "approved", approvedAt: new Date().toISOString() };
  audit("approval_granted", result);
  return result;
}

module.exports = { createApprovalRequest, approve };
