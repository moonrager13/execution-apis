# Paymaster Contract Deployment Guide

## Overview
This guide provides instructions for deploying the Paymaster contract to various networks.

## Prerequisites

1. Node.js (v14 or higher)
2. Hardhat - Ethereum development environment
3. Private Key - Your deployment account's private key
4. RPC Endpoint - Access to blockchain nodes

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add:
- PRIVATE_KEY - Your deployment account private key
- SEPOLIA_RPC_URL - Sepolia testnet RPC endpoint
- MAINNET_RPC_URL - Mainnet RPC endpoint
- POLYGON_RPC_URL - Polygon RPC endpoint
- ARBITRUM_RPC_URL - Arbitrum RPC endpoint
- ETHERSCAN_API_KEY - For contract verification

⚠️ Never commit .env file!

## Deployment

### Local Deployment (Hardhat Network)

```bash
npm run deploy:hardhat
```

### Sepolia Testnet

```bash
npm run deploy:sepolia
```

### Ethereum Mainnet

```bash
npm run deploy:mainnet
```

### Polygon Network

```bash
npm run deploy:polygon
```

### Arbitrum Network

```bash
npm run deploy:arbitrum
```

## Contract Details

### Paymaster Address (Hardcoded)

```
0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3
```

### Max Allowance

```
type(uint256).max (Unlimited)
```

## Deployment Output

After deployment, addresses are saved to `deployments/{network}.json`

## Contract Functions

### Payable Functions
- pay() - Accept ETH payments
- receive() - Fallback to accept ETH

### Token Functions
- receiveToken(token, amount) - Accept ERC20 tokens
- approveSpender(token, spender) - Approve spender with max allowance
- setPaymaster(token) - Set paymaster with max allowance

### Send Functions
- sendETH(to, amount) - Send ETH to recipient
- sendToken(token, to, amount) - Send tokens to recipient

### Getter Functions
- getPaymasterAddress() - Get hardcoded paymaster address
- getMaxAllowance() - Get max allowance value
- getBalance(account) - Get account balance
- getAllowance(token, spender) - Get spender allowance

## Security Notes

1. Never share your private key
2. Never commit .env file
3. Use testnets for initial testing
4. Verify contract code on block explorers
5. Test thoroughly before mainnet deployment
