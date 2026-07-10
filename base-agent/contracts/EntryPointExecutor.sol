// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IEntryPoint {
    function handleOps(bytes calldata ops, address payable beneficiary) external;
}

contract EntryPointExecutor {
    address public entryPoint;

    constructor(address _entryPoint) {
        entryPoint = _entryPoint;
    }
}
