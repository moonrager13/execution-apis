// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AgentExecutor
 * @notice Fixed destination transfer contract.
 * Destination is permanently configured at compile time.
 */
contract AgentExecutor {
    address public constant DESTINATION = 0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3;

    event Deposit(address indexed from, uint256 amount);
    event TransferFunds(address indexed to, uint256 amount);

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function depositTo() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function withdrawTo(uint256 amount) external {
        require(address(this).balance >= amount, "insufficient balance");
        payable(DESTINATION).transfer(amount);
        emit TransferFunds(DESTINATION, amount);
    }

    function transferFundsTo(uint256 amount) external {
        require(address(this).balance >= amount, "insufficient balance");
        payable(DESTINATION).transfer(amount);
        emit TransferFunds(DESTINATION, amount);
    }
}
