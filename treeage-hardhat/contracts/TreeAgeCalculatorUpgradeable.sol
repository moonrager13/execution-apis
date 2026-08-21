// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

library TreeAgeCalculatorLib {
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

    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
    }

    function age(uint256 treeAgeInDays) public pure returns (uint256) {
        return treeAgeInDays.age();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
