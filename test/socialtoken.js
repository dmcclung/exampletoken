const SocialToken = artifacts.require("SocialToken");

contract("The Social Token contract", async accounts => {
    it("should return the version", async () => {
        const contract = await SocialToken.deployed();

        const version = await contract.version();
        assert.equal("1.0", version);
    });
});