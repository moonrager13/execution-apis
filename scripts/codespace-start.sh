#!/bin/bash
set -e

npm install
npm run build

echo "Execution API Codespace ready"
echo "Start with: npm run start"
