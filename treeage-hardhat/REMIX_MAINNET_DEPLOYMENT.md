# Remix Mainnet Deployment Runbook

This runbook is for deploying `TreeAgeCalculatorUpgradeable` from the `main` source tree with a user-controlled wallet. It prepares the deployment path but does **not** contain or require a private key, RPC secret, or automatic broadcast.

## Source and compiler

Use:

- Solidity: `0.8.24`
- Optimizer: enabled
- Optimizer runs: `200`
- OpenZeppelin Contracts Upgradeable: `5.4.0`
- Contract: `contracts/TreeAgeCalculatorUpgradeable.sol`

Remix should compile the exact repository source before any live-network action.

## iPhone / Remix setup

1. Open `https://remix.ethereum.org/`.
2. Use **Git → Clone** and clone `https://github.com/moonrager13/execution-apis.git`, or load the Solidity file from the repository into a Remix workspace.
3. Open `treeage-hardhat/contracts/TreeAgeCalculatorUpgradeable.sol`.
4. Open **Solidity Compiler**.
5. Select compiler `0.8.24`.
6. Enable optimization and set runs to `200`.
7. Compile. Resolve every compiler warning/error before continuing.

Remix resolves npm imports automatically. Keep dependency versions pinned for reproducibility.

## Wallet connection — do not broadcast yet

For an iPhone wallet, use Remix **WalletConnect** in **Deploy & Run Transactions**. Connect the wallet you intend to own the proxy. Verify the wallet address and Ethereum Mainnet chain before any transaction is submitted.

Do not paste a private key into Remix or ChatGPT.

## UUPS deployment model

The Hardhat project normally uses OpenZeppelin Upgrades to create a UUPS proxy. In Remix, the equivalent deployment is:

1. Deploy the `TreeAgeCalculatorUpgradeable` **implementation**.
2. Deploy OpenZeppelin `ERC1967Proxy` using that implementation address and encoded `initialize(owner)` calldata.
3. Use the resulting **proxy address** for application calls and future upgrades.

The implementation constructor disables initializers, while the proxy initialization must be supplied during proxy construction. Never leave a production proxy uninitialized.

## Encode initialization data

The proxy constructor expects:

```text
implementation: <IMPLEMENTATION_ADDRESS>
_data: <ABI-ENCODED initialize(owner) CALL>
```

The encoded call must be equivalent to:

```solidity
initialize(<OWNER_ADDRESS>)
```

The owner should be the wallet address that is intentionally authorized to upgrade the UUPS proxy.

Before broadcasting the proxy transaction, independently verify:

- implementation address is the implementation you just compiled/deployed;
- owner address exactly matches the intended wallet;
- `_data` encodes `initialize(address)` and that same owner address;
- transaction value is `0 ETH`;
- network is Ethereum Mainnet (chain ID `1`).

## Pre-broadcast checklist

Do **not** click Deploy until all of these are true:

- local/CI compile and tests pass;
- Solidity compiler is `0.8.24`;
- optimizer is enabled with `200` runs;
- OpenZeppelin dependencies are the intended `5.4.0` release;
- wallet is the intended owner;
- wallet is on Ethereum Mainnet;
- implementation bytecode is the result of the reviewed source;
- proxy initialization calldata has been checked;
- transaction value is zero;
- expected gas cost is acceptable;
- no private key has been exposed.

## After deployment

Record both addresses:

- **Proxy** — application-facing address; keep this address for upgrades.
- **Implementation** — current logic contract.

Then verify on Etherscan and read the proxy's `owner()` and implementation address. The proxy should report the intended owner and point to the implementation that was just deployed.

## Important

This document is a deployment guide only. It does not execute transactions. The actual Mainnet broadcast must be explicitly approved in the wallet UI.
