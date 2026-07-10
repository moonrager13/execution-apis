# MoonRager Base Execution API

This module connects the execution layer to Base smart contracts.

## Environment

Create `.env`:

```env
BASE_RPC_URL=https://mainnet.base.org
BASE_ACCOUNT_ADDRESS=0xYourBaseAccount
MOONRAGER_TREASURY=0xYourContract
```

## Purpose

- Read MoonRager contract state
- Prepare controlled withdrawal calls
- Connect later to Base Account signing flows

Do not place private keys in this repository.
