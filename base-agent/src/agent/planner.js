export function validateAction(request) {
  const allowed = ['withdrawTo'];

  if (!allowed.includes(request.action)) {
    throw new Error('Unsupported action');
  }

  return {
    approvedForSimulation: true,
    action: request.action,
    requiresSignerApproval: true
  };
}
