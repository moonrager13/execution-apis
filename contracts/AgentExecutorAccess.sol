// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AgentExecutorAccess is AccessControl {
    bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function grantExecutor(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(EXECUTOR_ROLE, account);
    }
}
