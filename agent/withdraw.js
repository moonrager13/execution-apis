import { validateWithdrawal } from '../signing-gate/withdrawalPolicy.js';

export function createWithdrawalRequest({ contract, recipient, amount }) {
  validateWithdrawal({ contract, recipient, chain: 'base' });

  return {
    approved: false,
    function: 'withdrawTo',
    args: [recipient, amount],
    contract,
    chain: 'base'
  };
}
