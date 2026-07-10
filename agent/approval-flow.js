require("dotenv").config();

async function requestApproval() {
  if (process.env.AGENT_APPROVED !== "true") {
    throw new Error("Agent execution requires AGENT_APPROVED=true");
  }
  console.log("Approval granted. Agent may sign transaction.");
}

requestApproval().catch(console.error);
