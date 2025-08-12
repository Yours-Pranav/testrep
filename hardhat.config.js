require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.19",
  networks: {
    arb1: {
      url: process.env.RPC_URL || '',
      accounts: process.env.ADMIN_PRIVATE_KEY ? [process.env.ADMIN_PRIVATE_KEY] : []
    }
  }
};
