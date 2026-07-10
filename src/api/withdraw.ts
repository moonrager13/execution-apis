import { BaseTreasuryAgent } from "../base/agent/BaseTreasuryAgent";

const agent = new BaseTreasuryAgent();

export async function withdrawHandler(req: any, res: any) {
  if (req.headers.authorization !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { recipient, amountEth } = req.body;

  if (!recipient || !amountEth) {
    return res.status(400).json({ error: "recipient and amountEth required" });
  }

  try {
    const tx = await agent.executeWithdrawal(
      process.env.PRIVATE_KEY || "",
      recipient,
      amountEth
    );

    return res.json({ transaction: tx });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
