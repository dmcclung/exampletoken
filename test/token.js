const Token = artifacts.require("Token");

contract("The Token contract", async accounts => {
    it("should return the version", async () => {
        const contract = await Token.deployed();

        const version = await contract.version();
        assert.equal("1.0", version);
    });
});