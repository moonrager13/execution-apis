// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

library TreeAgeCalculatorLib {
    /**
     * @notice Calculate tree age in years, rounded up, for live trees
     * @param treeAgeInDays Age of the tree in days
     * @return Age of the tree in years, rounded up
     */
    function age(uint256 treeAgeInDays) internal pure returns (uint256) {
        return (treeAgeInDays + 364) / 365;
    }
}

/// @custom:oz-upgrades
contract TreeAgeCalculatorUpgradeable is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    using TreeAgeCalculatorLib for uint256;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializes the contract, replaces the constructor for upgradeable contracts.
     * @dev Can only be called once, immediately after proxy deployment.
     * @param initialOwner Address that will be authorized to perform upgrades.
     */
    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
    }

    /**
     * @notice Wrapper function to calculate tree age in years, rounded up
     * @param treeAgeInDays Age of the tree in days
     * @return Age of the tree in years, rounded up
     */
    function age(uint256 treeAgeInDays) public pure returns (uint256) {
        return treeAgeInDays.age();
    }

    /**
     * @dev Restricts who can authorize an upgrade to a new implementation.
     * Only the owner may upgrade. Required override for UUPSUpgradeable.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
