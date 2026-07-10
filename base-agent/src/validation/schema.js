export function validatePrepareRequest(body) {
  if (!body.action) throw new Error('Missing action');
  if (body.action !== 'withdrawTo') throw new Error('Unsupported action');
  if (!body.recipient) throw new Error('Missing recipient');
  if (!body.amount) throw new Error('Missing amount');

  return true;
}
