# Pull request to merge the initializer/test fixes into feat/treeage-hardhat-upgrade

This branch fixes two issues:

1. Corrects the OpenZeppelin Ownable initializer usage in treeage-hardhat/contracts/TreeAgeCalculatorUpgradeable.sol so `initialize(address initialOwner)` calls `__Ownable_init()` and then transfers ownership to the provided initialOwner. This prevents compile errors against the OZ contracts.

2. Normalizes the Etheruem address comparison in test/AgentExecutor.test.js using `ethers.getAddress(...)` so checksum differences don't fail CI.
