# Withdrawal API

Endpoint:

POST /api/withdraw

Headers:

Authorization: Bearer YOUR_API_KEY

Body:

```json
{
  "recipient": "0xRecipient",
  "amountEth": "1.0"
}
```

Required environment:

- API_KEY
- PRIVATE_KEY
- ALLOW_WITHDRAWALS=true
- BASE_RPC_URL
