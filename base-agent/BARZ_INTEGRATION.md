# Barz Integration

This project integrates with the Barz smart contract wallet architecture.

Source architecture:
- Modular Diamond (EIP-2535) wallet design
- Facets for account features
- Upgradeable modules
- Multi-signature and passkey signature support

Integration plan:

1. Use Barz as the smart account layer.
2. Use BaseAgentVault as execution/payment layer.
3. Add ERC-4337 account abstraction entry point support.
4. Add deployment scripts for Base Mainnet.
5. Add verification and CI workflows.

Repository dependency:
trustwallet/barz

Do not copy private keys or deployment secrets into GitHub.