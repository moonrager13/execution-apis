import { buildWithdrawTransaction } from '../tx/builder.js';
import { validateAction } from '../agent/planner.js';

export async function prepareTransaction(request) {
  const validation = validateAction(request);

  if (request.action === 'withdrawTo') {
    return {
      validation,
      transaction: buildWithdrawTransaction(
        request.recipient,
        request.amount
      )
    };
  }

  throw new Error('Unsupported request');
}
