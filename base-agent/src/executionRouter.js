import fs from 'fs';
import { ethers } from 'ethers';

const networks = JSON.parse(fs.readFileSync('./config/networks.json'));

export function createExecutionRouter(network = 'baseSepolia') {
  const config = networks[network];

  return {
    network,
    entryPoint: config.entryPoint,
    barzFactory: config.barzFactory,
    provider: new ethers.JsonRpcProvider(process.env.BASE_RPC_URL)
  };
}
