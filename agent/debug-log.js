const DEBUG_ENABLED = process.env.DEBUG_LOGS === "true";

function debug(event, payload = {}) {
  if (!DEBUG_ENABLED) return;

  console.log(JSON.stringify({
    level: "debug",
    event,
    timestamp: new Date().toISOString(),
    payload
  }));
}

module.exports = { debug };
