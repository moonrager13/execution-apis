// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Paymaster
 * @dev A contract implementing payable/receivable functions and paymaster/spender mechanism
 * with max allowance limits for the specified address
 */

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract Paymaster {
    // The address that will be used as paymaster/spender
    address public constant PAYMASTER_ADDRESS = 0xfd1610f5eae31dd757e55d6b4ba543b80a2720b3;
    
    // Maximum allowance (type(uint256).max represents unlimited)
    uint256 public constant MAX_ALLOWANCE = type(uint256).max;
    
    // Track spender allowances for each token
    mapping(address => mapping(address => uint256)) public spenderAllowances;
    
    // Track balances for receivable functionality
    mapping(address => uint256) public balances;
    
    // Events
    event Received(address indexed from, uint256 amount);
    event Paid(address indexed to, uint256 amount);
    event PaymasterSet(address indexed paymaster, uint256 allowance);
    event SpenderApproved(address indexed token, address indexed spender, uint256 allowance);
    event TokenReceived(address indexed from, address indexed token, uint256 amount);
    
    /**
     * @dev Receive function to accept ETH transfers
     */
    receive() external payable {
        _recordReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Fallback function to accept ETH transfers
     */
    fallback() external payable {
        _recordReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Internal function to record received payments
     * @param from The sender address
     * @param amount The amount received
     */
    function _recordReceived(address from, uint256 amount) internal {
        balances[from] += amount;
        emit Received(from, amount);
    }
    
    /**
     * @dev Payable function to accept ETH and track the sender
     */
    function pay() external payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        _recordReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Receive ERC20 tokens from external callers
     * @param token The ERC20 token address
     * @param amount The amount of tokens to receive
     */
    function receiveToken(address token, uint256 amount) external {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        
        bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");
        
        balances[msg.sender] += amount;
        emit TokenReceived(msg.sender, token, amount);
    }
    
    /**
     * @dev Approve a spender for a specific token with max allowance
     * @param token The ERC20 token address
     * @param spender The spender address
     */
    function approveSpender(address token, address spender) external {
        require(token != address(0), "Invalid token address");
        require(spender != address(0), "Invalid spender address");
        
        bool success = IERC20(token).approve(spender, MAX_ALLOWANCE);
        require(success, "Approval failed");
        
        spenderAllowances[token][spender] = MAX_ALLOWANCE;
        emit SpenderApproved(token, spender, MAX_ALLOWANCE);
    }
    
    /**
     * @dev Set paymaster with max allowance for a specific token
     * @param token The ERC20 token address
     */
    function setPaymaster(address token) external {
        require(token != address(0), "Invalid token address");
        
        bool success = IERC20(token).approve(PAYMASTER_ADDRESS, MAX_ALLOWANCE);
        require(success, "Paymaster approval failed");
        
        spenderAllowances[token][PAYMASTER_ADDRESS] = MAX_ALLOWANCE;
        emit PaymasterSet(PAYMASTER_ADDRESS, MAX_ALLOWANCE);
    }
    
    /**
     * @dev Send ETH to a recipient
     * @param to The recipient address
     * @param amount The amount to send
     */
    function sendETH(address payable to, uint256 amount) external {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= amount, "Insufficient contract balance");
        
        (bool success, ) = to.call{value: amount}("");
        require(success, "ETH transfer failed");
        
        emit Paid(to, amount);
    }
    
    /**
     * @dev Send ERC20 tokens to a recipient
     * @param token The ERC20 token address
     * @param to The recipient address
     * @param amount The amount to send
     */
    function sendToken(address token, address to, uint256 amount) external {
        require(token != address(0), "Invalid token address");
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than 0");
        
        bool success = IERC20(token).transfer(to, amount);
        require(success, "Token transfer failed");
        
        emit Paid(to, amount);
    }
    
    /**
     * @dev Get the allowance granted to a spender for a specific token
     * @param token The ERC20 token address
     * @param spender The spender address
     * @return The allowance amount
     */
    function getAllowance(address token, address spender) external view returns (uint256) {
        return spenderAllowances[token][spender];
    }
    
    /**
     * @dev Get the balance for a specific address
     * @param account The account address
     * @return The balance amount
     */
    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }
    
    /**
     * @dev Get the contract's ETH balance
     * @return The ETH balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Get the paymaster address
     * @return The paymaster address
     */
    function getPaymasterAddress() external pure returns (address) {
        return PAYMASTER_ADDRESS;
    }
    
    /**
     * @dev Get the max allowance value
     * @return The max allowance
     */
    function getMaxAllowance() external pure returns (uint256) {
        return MAX_ALLOWANCE;
    }
}
