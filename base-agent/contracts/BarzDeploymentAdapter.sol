// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBarzFactory {
    function createAccount(bytes32 salt) external returns (address);
}

contract BarzDeploymentAdapter {
    event AccountCreated(address account);

    function createBarzAccount(address factory, bytes32 salt) external returns (address account) {
        account = IBarzFactory(factory).createAccount(salt);
        emit AccountCreated(account);
    }
}
