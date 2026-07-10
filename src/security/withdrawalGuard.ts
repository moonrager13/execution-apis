export function validateWithdrawal(input: {
  recipient: string;
  amountEth: string;
}) {
  const maxAmount = process.env.MAX_WITHDRAWAL_ETH || "1";
  const allowedRecipient = process.env.WITHDRAWAL_RECIPIENT;

  if (!input.recipient) {
    throw new Error("Missing recipient");
  }

  if (allowedRecipient && input.recipient.toLowerCase() !== allowedRecipient.toLowerCase()) {
    throw new Error("Recipient not allowed");
  }

  if (Number(input.amountEth) <= 0) {
    throw new Error("Amount must be positive");
  }

  if (Number(input.amountEth) > Number(maxAmount)) {
    throw new Error("Amount exceeds withdrawal limit");
  }

  return true;
}
