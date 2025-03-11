require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://goerli.base.org", // Base Testnet RPC
      accounts: [process.env.PRIVATE_KEY]
    },
    zetachain: {
      url: "https://rpc.ankr.com/zetachain_evm_testnet",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
