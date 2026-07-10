require("dotenv").config();

function validateTransaction({ amount, destination }) {
  const max = BigInt(process.env.MAX_WITHDRAWAL_WEI || "0");

  if (max > 0n && BigInt(amount) > max) {
    throw new Error("Withdrawal exceeds configured limit");
  }

  if (destination !== process.env.DESTINATION_ADDRESS) {
    throw new Error("Destination address mismatch");
  }

  return true;
}

module.exports = validateTransaction;
