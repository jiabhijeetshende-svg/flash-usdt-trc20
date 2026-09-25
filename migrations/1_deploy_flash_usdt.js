const FlashUSDT = artifacts.require("FlashUSDT");

module.exports = function(deployer) {
  // Deploy with initial supply of 1,000,000 tokens
  const initialSupply = 1000000;
  deployer.deploy(FlashUSDT, initialSupply);
};
