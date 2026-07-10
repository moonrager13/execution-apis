require("dotenv").config();

module.exports = {
  maxWithdrawalWei: process.env.MAX_WITHDRAWAL_WEI || "0",
  allowedDestination: process.env.DESTINATION_ADDRESS,
  dryRun: process.env.DRY_RUN !== "false"
};
