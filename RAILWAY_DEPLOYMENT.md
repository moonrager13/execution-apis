# Railway Deployment

GitHub Actions requires these repository secrets:

- `RAILWAY_TOKEN`
  - Railway project deployment token
- `RAILWAY_SERVICE`
  - Railway service identifier

Add them in:

GitHub Repository → Settings → Secrets and variables → Actions → New repository secret

Required application secrets:

- `API_KEY`
- `PRIVATE_KEY`
- `BASE_RPC_URL`
- `BASESCAN_API_KEY`
- `WITHDRAWAL_RECIPIENT`
- `MAX_WITHDRAWAL_ETH`
- `ALLOW_WITHDRAWALS`

After adding secrets, every push to `main` will build and deploy the API.
