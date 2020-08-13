const Faucet = artifacts.require("Faucet");

module.exports = function(deployer) {
  const dripTokenQuantity = 1;

  deployer.deploy(Faucet, dripTokenQuantity);
};
