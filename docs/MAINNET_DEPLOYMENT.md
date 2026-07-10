# Base + Ethereum Mainnet Deployment

The contract now uses a fixed transfer destination:

`0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3`

Deployment flow:

1. Run tests.
2. Deploy with GitHub Actions secrets.
3. Save deployment artifact.
4. Verify on BaseScan/Etherscan.

Required secrets:
- BASE_RPC_URL
- MAINNET_RPC_URL
- DEPLOYER_PRIVATE_KEY
- BASESCAN_API_KEY
- ETHERSCAN_API_KEY

Do not store private keys in repository files.
