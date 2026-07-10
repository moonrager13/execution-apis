// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ERC4337Executor {
    event UserOperationExecuted(address indexed sender);

    function executeUserOperation(address sender) external {
        emit UserOperationExecuted(sender);
    }
}
