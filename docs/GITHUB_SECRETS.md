# GitHub Actions Secrets

Add these repository secrets:

- `DEPLOYER_PRIVATE_KEY`
  - Deployment wallet private key
  - Never commit this value

- `BASE_RPC_URL`
  - Base RPC endpoint

- `MAINNET_RPC_URL`
  - Ethereum mainnet RPC endpoint

- `BASESCAN_API_KEY`
  - BaseScan verification key

- `ETHERSCAN_API_KEY`
  - Etherscan verification key

Recommended:
- Use a dedicated deployment wallet
- Prefer hardware wallet signing for production
- Protect the production environment with GitHub approvals
