import { Interface } from 'ethers';

const iface = new Interface([
  'function withdrawTo(address,uint256)'
]);

export function buildWithdrawTransaction(to, amount) {
  return {
    to: process.env.CONTRACT_ADDRESS,
    data: iface.encodeFunctionData('withdrawTo', [to, amount]),
    value: '0x0'
  };
}
