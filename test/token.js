const Token = artifacts.require("Token");

contract("The Token contract", async accounts => {

    let contract;

    beforeEach(async () => {
        contract = await Token.new(2, 5);
    });

    it("should return the version", async () => {
        const version = await contract.version();
        assert.equal(version, "1.0");
    });

    it("should return the token sale start block", async () => {
        const tokenSaleStartBlock = await contract.tokenSaleStartBlock();
        assert.equal(tokenSaleStartBlock, 2);
    });

    it("should return the token sale end block", async () => {
        const tokenSaleEndBlock = await contract.tokenSaleEndBlock();
        assert.equal(tokenSaleEndBlock, 5);
    });

    it("should not close the sale if already closed", async () => {
        assert.fail("Not implemented yet");
    });

    it("should allocate tokens to purchases equal to the exchange rate", async () => {
        assert.fail("Not implemented yet");
    });

    it("should not allow payable to a fallback or receive method", async () => {
        assert.fail("Not implemented yet");
    });

    it("should return the balance allocated", async () => {
        assert.fail("Not implmemented yet");
    });

    it("should return the cap", async () => {
        const cap = await contract.cap();
        assert.equal(cap, 150 * 10**6 * 10**18);
    });
    
    it("should reject token requests over the cap", async () => {        
        assert.fail("Not implemented yet");
    });    
});