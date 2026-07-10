// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BaseAgentVault {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    receive() external payable {}

    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "insufficient balance");
        to.transfer(amount);
    }
}
