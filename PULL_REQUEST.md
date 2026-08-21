# Pull request: merge feat/treeage-hardhat-upgrade into main

This PR integrates the corrected TreeAge Hardhat project and related fixes:

- Adds treeage-hardhat project (contracts, scripts, tests, CI workflow).
- Fixes the OpenZeppelin initializer usage in TreeAgeCalculatorUpgradeable.
- Normalizes a test to avoid checksum-sensitive address comparisons.
- Adds .wordlist to whitelist project-specific names for spellcheck.

CI: includes a dedicated treeage-hardhat CI workflow that compiles and runs the project tests.

Please review and merge with rebase-and-merge when checks are green.