require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost:{
      url: "http://127.0.0.1:8545"
    },
    base: {
      url: "https://goerli.base.org", // Base Testnet RPC
      accounts: [process.env.PRIVATE_KEY]
    },
    zetaChain: {
      url: `https://zetachain-testnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
