const assert = require("assert");
const Token = artifacts.require("Token");

contract("The Token contract", async accounts => {

    let contract;
    let ethAddress;
    let reservedSupplyAddress;
    let faucetSupplyAddress;    

    beforeEach(async () => {
        ethAddress = accounts[1];
        reservedSupplyAddress = accounts[2];
        faucetSupplyAddress = accounts[3];

        contract = await Token.new(0, 20000, ethAddress, reservedSupplyAddress, faucetSupplyAddress);
    });    

    it("should return the version", async () => {
        const version = await contract.version();
        assert.equal(version, "1.0");
    });

    it("should return the token sale start block", async () => {
        const tokenSaleStartBlock = await contract.tokenSaleStartBlock();
        assert.equal(tokenSaleStartBlock, 0);
    });

    it("should return the token sale end block", async () => {
        const tokenSaleEndBlock = await contract.tokenSaleEndBlock();
        assert.equal(tokenSaleEndBlock, 20000);
    });

    it("should return the cap", async () => {
        const cap = await contract.cap();
        assert.equal(cap, 200 * 10**6 * 10**18);
    });

    it("should not finalize the sale if not ended", async () => {
        assert.rejects(contract.finalizeSale(), /revert Token sale has not ended/);
    });

    it("should not finalize the sale if caller is not the final address", async () => {        
        ethAddress = accounts[1];
        reservedSupplyAddress = accounts[2];
        faucetSupplyAddress = accounts[3];
        
        // setup the token contract to be in an end state
        const contract = await Token.new(0, 0, ethAddress, reservedSupplyAddress, faucetSupplyAddress);
        assert.rejects(contract.finalizeSale(), /revert Only the ETH fund can finalize/);
    });

    it("should not finalize the sale if minimum token supply is not met", async () => {
        // how to interact with contracts
        // https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts
        ethAddress = accounts[1];
        reservedSupplyAddress = accounts[2];
        faucetSupplyAddress = accounts[3];
                
        const contract = await Token.new(0, 0, ethAddress, reservedSupplyAddress, faucetSupplyAddress);
        assert.rejects(contract.finalizeSale({from: ethAddress}), /revert Token sale did not meet minimum/);
    });

    it("should finalize the sale successfully if conditions are met", async () => {
        const reservedSupplyAddress = accounts[9];
        const faucetSupplyAddress = accounts[8];

        const ethAddress = accounts[1];
        const ethAddressInitialBalance = await web3.eth.getBalance(ethAddress);
        
        const blockHeight = await web3.eth.getBlockNumber();        

        const tokenCreatorAddress = accounts[4];
        const contract = await Token.new(blockHeight, blockHeight + 20, ethAddress, reservedSupplyAddress, faucetSupplyAddress);        
        // mint minimum tokens        
        await contract.createTokens({from: tokenCreatorAddress, value: 100000});

        // Advance block height to end sale
        const advanceBlockHeight = () => {
            return new Promise((resolve, reject) => {                
                web3.currentProvider.send({                    
                    jsonrpc: "2.0",
                    method: "evm_mine"
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });
        };
        
        await Promise.all([...Array(20)].map(() => advanceBlockHeight()));

        // Remember only the ethAddress can finalize        
        await contract.finalizeSale({from: ethAddress});
        
        /*const final = await contract.isFinal();
        assert.equal(final, true);
                
        const ethAddressFinalBalance = await web3.eth.getBalance(ethAddress);
        assert.equal(ethAddressFinalBalance - ethAddressInitialBalance, 100000);        */
    }); 

    it("should allocate tokens to purchases equal to the exchange rate", async () => {
        //TODO: create tokens and check balance
        assert.fail("Not implemented yet");
    });

    it("should not allow payable to a fallback or receive method", async () => {
        //TODO: send eth transaction to contract address
        assert.fail("Not implemented yet");
    });

    it("should return the balance allocated", async () => {
        //TODO: check balance of reserved supply
        assert.fail("Not implemented yet");
    });    
    
    it("should reject token requests over the cap", async () => {        
        //TODO: mint enough tokens to get to cap
        assert.fail("Not implemented yet");
    });    

    it("should be able to get 1 wei tokens from faucet", async () => {
        //TODO: call faucet method and check balance
        assert.fail("Not implemented yet");
    });

    it("should not be able to get tokens from faucet once exhausted", async () => {
        //TODO: deploy a contract with a variable faucet amount
        //
        assert.fail("Not implemented yet");
    });
});