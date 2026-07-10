import { validatePrepareRequest } from './validation/schema.js';
import { prepareTransaction } from './api/server.js';

export async function handleAgentRequest(body) {
  validatePrepareRequest(body);
  return await prepareTransaction(body);
}
