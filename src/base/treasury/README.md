# Base Treasury Withdraw Integration

Contract:

`0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789`

Network:

Base Mainnet (chain ID 8453)

## Usage

The `withdrawTo` action calls:

```solidity
withdrawTo(address recipient, uint256 amount)
```

Example:

```ts
withdrawTo(
  PRIVATE_KEY,
  "0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3",
  "10"
)
```

Only wallets authorized by the deployed contract can successfully execute withdrawals.
