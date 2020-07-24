const SocialToken = artifacts.require("SocialToken");

module.exports = function(deployer) {
  deployer.deploy(SocialToken);
};
