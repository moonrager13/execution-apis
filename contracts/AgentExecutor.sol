// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AgentExecutor
 * @notice Owner-controlled execution contract.
 * Agents prepare requests; owner controls authorization.
 */
contract AgentExecutor {
    address public owner;

    event Executed(address indexed target, uint256 value, bytes data);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function execute(address target, uint256 value, bytes calldata data)
        external
        onlyOwner
        returns (bytes memory result)
    {
        (bool ok, bytes memory res) = target.call{value: value}(data);
        require(ok, "execution failed");
        emit Executed(target, value, data);
        return res;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
