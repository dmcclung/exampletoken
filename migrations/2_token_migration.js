const Token = artifacts.require("Token");

module.exports = function(deployer) {
  const ethAddress = "0x6C8eb2c1149987f53Bb4Be0Fa56CCf3813Ea8765";
  const reservedSupplyAddress = "0xb0490C4F0Afc0e9ed49685b2339d3a44208A88D6";
  const faucetSupplyAddress = "0xD3C2a70878aA5744caA292207ef485B9152416ac";
  const tokenSaleStartBlock = 10609007;
  const tokenSaleEndBlock = 12186007;

  deployer.deploy(Token, tokenSaleStartBlock, tokenSaleEndBlock, 
    ethAddress, reservedSupplyAddress, faucetSupplyAddress);
};
