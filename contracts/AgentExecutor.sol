// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AgentExecutor {
    address public constant DESTINATION = 0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3;
    address public owner;
    mapping(address => bool) public authorizedExecutors;

    event Deposit(address indexed from, uint256 amount);
    event TransferFunds(address indexed to, uint256 amount);
    event ExecutorUpdated(address indexed executor, bool enabled);

    modifier onlyAuthorized() {
        require(msg.sender == owner || authorizedExecutors[msg.sender], "unauthorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function depositTo() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function setExecutor(address executor, bool enabled) external {
        require(msg.sender == owner, "only owner");
        authorizedExecutors[executor] = enabled;
        emit ExecutorUpdated(executor, enabled);
    }

    function withdrawTo(uint256 amount) external onlyAuthorized {
        require(address(this).balance >= amount, "insufficient balance");
        payable(DESTINATION).transfer(amount);
        emit TransferFunds(DESTINATION, amount);
    }

    function transferFundsTo(uint256 amount) external onlyAuthorized {
        require(address(this).balance >= amount, "insufficient balance");
        payable(DESTINATION).transfer(amount);
        emit TransferFunds(DESTINATION, amount);
    }
}
