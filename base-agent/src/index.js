import 'dotenv/config';
import { JsonRpcProvider, Interface } from 'ethers';

const provider = new JsonRpcProvider(process.env.BASE_RPC_URL || 'https://mainnet.base.org');

const contractAddress = process.env.CONTRACT_ADDRESS || '';

const abi = [
  'function withdrawTo(address,uint256)'
];

const contractInterface = new Interface(abi);

async function main() {
  const network = await provider.getNetwork();

  console.log('Base Agent online');
  console.log('Chain ID:', network.chainId.toString());
  console.log('Contract:', contractAddress || 'not configured');

  // Simulation-only transaction builder.
  // Signing and broadcasting should be performed by an approved signer.
  const example = contractInterface.encodeFunctionData('withdrawTo', [
    '0x0000000000000000000000000000000000000000',
    0
  ]);

  console.log('Prepared calldata:', example);
}

main().catch(console.error);
