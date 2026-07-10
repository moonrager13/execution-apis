const fs = require("fs");

function audit(event, data = {}) {
  fs.appendFileSync(
    "agent-audit.jsonl",
    JSON.stringify({
      event,
      data,
      timestamp: new Date().toISOString()
    }) + "\n"
  );
}

module.exports = audit;
