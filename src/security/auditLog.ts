export function auditWithdrawal(event: {
  recipient: string;
  amountEth: string;
  status: string;
}) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    type: "withdrawal",
    ...event
  }));
}
