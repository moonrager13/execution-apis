# Deployment

## Docker

Build:

```bash
docker build -t execution-api .
```

Run:

```bash
docker compose up -d
```

Required environment variables:

- API_KEY
- PRIVATE_KEY
- BASE_RPC_URL
- BASESCAN_API_KEY
- WITHDRAWAL_RECIPIENT
- MAX_WITHDRAWAL_ETH
- ALLOW_WITHDRAWALS

The service listens on port 3000.
