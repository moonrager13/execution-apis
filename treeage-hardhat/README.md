# TreeAgeCalculator — UUPS Upgradeable Hardhat Project

This project deploys `TreeAgeCalculatorUpgradeable` behind an OpenZeppelin UUPS proxy and includes a tested V2 upgrade path.

## Safety model

- OpenZeppelin upgrade validation is used for proxy deployment and upgrades.
- The implementation constructor calls `_disableInitializers()`.
- The proxy owner is the only account authorized to upgrade.
- V2 adds functions without changing V1 storage layout.
- Tests cover initialization, calculation behavior, ownership, unauthorized upgrades, implementation locking, and state preservation across an upgrade.

## Install

```bash
npm install
```

## Local validation

```bash
npm test
npm run compile
```

Run tests before supplying any real RPC URL or private key.

## Environment

```bash
cp .env.example .env
```

Set `SEPOLIA_RPC_URL`, `MAINNET_RPC_URL`, `DEPLOYER_PRIVATE_KEY`, and `ETHERSCAN_API_KEY` in `.env`. Keep the private key local and never commit `.env`.

## Sepolia deployment

```bash
npm run deploy:sepolia
```

Record the **proxy** address. The proxy is the address your application should use and the address retained across upgrades.

## Sepolia upgrade

Set `PROXY_ADDRESS` only in your local `.env`, then run:

```bash
npm run upgrade:sepolia
```

The script verifies that the signing account is the current proxy owner before requesting the upgrade.

## Mainnet

Only after local tests and Sepolia deployment/upgrade testing pass:

```bash
npm run deploy:mainnet
```

For an existing mainnet proxy, set `PROXY_ADDRESS` locally and run:

```bash
npm run upgrade:mainnet
```

Do not use a mainnet private key in CI unless you have deliberately designed and audited the signing setup.

## Project layout

- `contracts/TreeAgeCalculatorUpgradeable.sol` — V1
- `contracts/TreeAgeCalculatorUpgradeableV2.sol` — tested V2 implementation
- `scripts/deploy.js` — UUPS proxy deployment
- `scripts/upgrade.js` — owner-gated V2 upgrade
- `test/TreeAgeCalculatorUpgradeable.test.js` — deployment and upgrade tests
