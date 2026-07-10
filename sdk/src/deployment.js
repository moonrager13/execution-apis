import fs from "fs";

export function loadDeployment(network = "base") {
  const path = `../../deployments/${network}.json`;
  if (!fs.existsSync(path)) throw new Error(`Missing deployment file: ${path}`);
  return JSON.parse(fs.readFileSync(path, "utf8"));
}
