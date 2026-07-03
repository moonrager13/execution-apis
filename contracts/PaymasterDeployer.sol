// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Paymaster.sol";

/**
 * @title PaymasterDeployer
 * @dev A simple deployment script contract that deploys the Paymaster contract
 */
contract PaymasterDeployer {
    address public deployedPaymaster;
    
    event PaymasterDeployed(address indexed paymasterAddress);
    
    /**
     * @dev Deploy the Paymaster contract
     * @return The address of the deployed Paymaster contract
     */
    function deployPaymaster() external returns (address) {
        require(deployedPaymaster == address(0), "Paymaster already deployed");
        
        Paymaster paymaster = new Paymaster();
        deployedPaymaster = address(paymaster);
        
        emit PaymasterDeployed(deployedPaymaster);
        return deployedPaymaster;
    }
    
    /**
     * @dev Get the deployed Paymaster contract address
     * @return The address of the deployed Paymaster contract
     */
    function getDeployedPaymaster() external view returns (address) {
        return deployedPaymaster;
    }
}
