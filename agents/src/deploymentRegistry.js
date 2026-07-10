import fs from "fs";

export function loadDeployment(network = "base") {
  const deployments = JSON.parse(fs.readFileSync("deployments.json"));
  return deployments[network];
}
