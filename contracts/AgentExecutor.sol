// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AgentExecutor is Ownable {
    event Executed(address indexed target, uint256 value, bytes data);

    constructor() Ownable(msg.sender) {}

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
}
