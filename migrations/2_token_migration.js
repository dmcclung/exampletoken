const Token = artifacts.require("Token");

module.exports = function(deployer) {
  deployer.deploy(Token, 10500, 11000, 
    ethAddress, reservedSupplyAddress, faucetSupplyAddress);
};
