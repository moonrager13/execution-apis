# Agent Deployment Layer

This directory defines the architecture for AI agents that can interact with the execution stack.

## Agent capabilities
- Read deployment configuration
- Prepare contract deployment transactions
- Call approved contract functions
- Monitor transaction status
- Produce deployment reports

## Security model
Agents should never hold unrestricted private keys.

Recommended flow:

Agent -> Policy Layer -> Wallet/Secure Signer -> Smart Contract

Required controls:
- Allowlisted contracts
- Allowlisted functions
- Human approval for sensitive actions
- Transaction simulation before execution

## Supported environments
- Base
- Ethereum
- Testnets
