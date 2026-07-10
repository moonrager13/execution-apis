// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AgentExecutor is Ownable {
    address public constant FIXED_OWNER = 0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3;

    event Executed(address indexed target, uint256 value, bytes data);

    constructor() Ownable(FIXED_OWNER) {}

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

    function transferOwnership(address) public pure override {
        revert("ownership transfer disabled");
    }

    function renounceOwnership() public pure override {
        revert("ownership renounce disabled");
    }
}
