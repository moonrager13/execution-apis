# Base Agent Integration

This directory contains the Base agent integration layer for interacting with Base smart contracts through a controlled execution service.

## Purpose

- Provide an agent interface for Base network actions
- Connect approved commands to Ethereum-compatible JSON-RPC providers
- Keep contract execution isolated from the specification repository

## Configuration

Create environment variables:

```bash
BASE_RPC_URL=
BASE_CHAIN_ID=8453
AGENT_PRIVATE_KEY=
CONTRACT_ADDRESS=
```

## Safety

Before executing contract calls, validate:

- target contract address
- function selector
- calldata
- destination address
- transaction value

Never commit private keys or secrets.
