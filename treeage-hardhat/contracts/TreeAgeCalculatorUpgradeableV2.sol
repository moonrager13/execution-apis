// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./TreeAgeCalculatorUpgradeable.sol";

/// @custom:oz-upgrades
contract TreeAgeCalculatorUpgradeableV2 is TreeAgeCalculatorUpgradeable {
    /// @notice Returns the implementation version exposed by V2.
    function version() external pure returns (uint256) {
        return 2;
    }

    /// @notice Same calculation as V1, exposed under an explicit V2 function name for upgrade testing.
    function ageV2(uint256 treeAgeInDays) external pure returns (uint256) {
        return age(treeAgeInDays);
    }
}
