const Token = artifacts.require("Token");

module.exports = function(deployer) {
  const ethAddress = "0x828181";
  const reservedSupplyAddress = "0x5245";
  const faucetSupplyAddress = "0x8910";

  deployer.deploy(Token, 10500, 11000, 
    ethAddress, reservedSupplyAddress, faucetSupplyAddress);
};
