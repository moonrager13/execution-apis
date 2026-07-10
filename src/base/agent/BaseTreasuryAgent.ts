import { withdrawTo } from "../treasury/withdrawTo";

export class BaseTreasuryAgent {
  async executeWithdrawal(privateKey: string, recipient: string, amountEth: string) {
    if (!process.env.ALLOW_WITHDRAWALS) {
      throw new Error("Withdrawals disabled by configuration");
    }

    return withdrawTo(privateKey, recipient, amountEth);
  }
}
