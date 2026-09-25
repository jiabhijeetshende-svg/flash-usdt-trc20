require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    tronMainnet: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://api.trongrid.io`
      ),
      network_id: 1,
      gasPrice: 30000000,
      gas: 8000000
    },
    tronShasta: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://api.shasta.trongrid.io`
      ),
      network_id: 2,
      gasPrice: 30000000,
      gas: 8000000
    }
  },

  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
