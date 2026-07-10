const ALLOWED_CONTRACT = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'.toLowerCase();
const ALLOWED_RECIPIENT = '0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3'.toLowerCase();

export function validateWithdrawal({ contract, recipient, chain }) {
  if (chain !== 'base') throw new Error('Only Base is allowed');
  if (contract.toLowerCase() !== ALLOWED_CONTRACT) throw new Error('Contract not allowed');
  if (recipient.toLowerCase() !== ALLOWED_RECIPIENT) throw new Error('Recipient not allowed');
  return true;
}
