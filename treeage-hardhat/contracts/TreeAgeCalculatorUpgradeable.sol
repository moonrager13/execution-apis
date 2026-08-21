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
        // OwnableUpgradeable.__Ownable_init does not accept an owner argument.
        // Initialize ownership to msg.sender (the deployer), then transfer to initialOwner if provided.
        __Ownable_init();
        __UUPSUpgradeable_init();

        if (initialOwner != address(0) && initialOwner != owner()) {
            // transferOwnership is public onlyOwner; this contract is currently owned by msg.sender from __Ownable_init()
            transferOwnership(initialOwner);
        }
    }

    function age(uint256 treeAgeInDays) public pure returns (uint256) {
        return treeAgeInDays.age();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
