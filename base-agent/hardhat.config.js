require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: '0.8.24',
  networks: {
    base: {
      url: process.env.BASE_RPC_URL || '',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    ethereum: {
      url: process.env.ETH_RPC_URL || '',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
