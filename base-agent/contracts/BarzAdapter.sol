// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBarzAccount {
    function execute(address target, uint256 value, bytes calldata data) external;
}

contract BarzAdapter {
    function executeFromBarz(address barz, address target, uint256 value, bytes calldata data) external {
        IBarzAccount(barz).execute(target, value, data);
    }
}
