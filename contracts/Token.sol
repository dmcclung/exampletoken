// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * This token incorporates a cap and crowdsale components along with a faucet capability for users
 * that are unable to participate in the crowdsale.
 */
contract Token is ERC20Capped {
    string private _version = "1.0";

    uint256 private _reservedSupply = 50 * 10**6 * 10**18;
    uint256 private _faucetSupply = 1 * 10**4 * 10**18;
    uint256 private _tokenCap = 150 * 10**6 * 10**18;
    uint256 private _exchangeRate = 10000;

    string private _tokenName = "ExampleToken";
    string private _tokenSymbol = "EXT";

    // Token sale has a start and end date, final means that the sale has ended and
    // the ETH collected has been sent to the contract owner's configured address
    bool private _isFinal;
    uint256 private _tokenSaleStartBlock;
    uint256 private _tokenSaleEndBlock;
    address payable private _ethAddress;

    address private _reservedSupplyAddress;
    address private _faucetSupplyAddress;

    event CreateEXT(address indexed _to, uint256 _value);

    constructor(uint256 tokenSaleStartBlock, uint256 tokenSaleEndBlock, address payable ethAddress,
        address reservedSupplyAddress, address faucetSupplyAddress) public
        ERC20(_tokenName, _tokenSymbol) ERC20Capped(_tokenCap)  {
        _isFinal = false;
        _tokenSaleStartBlock = tokenSaleStartBlock;
        _tokenSaleEndBlock = tokenSaleEndBlock;
        _ethAddress = ethAddress;
        _reservedSupplyAddress = reservedSupplyAddress;
        _faucetSupplyAddress = faucetSupplyAddress;

        _mint(_reservedSupplyAddress, _reservedSupply);
        emit CreateEXT(_reservedSupplyAddress, _reservedSupply);

        _mint(_faucetSupplyAddress, _faucetSupply);
        emit CreateEXT(_faucetSupplyAddress, _faucetSupply);
    }

    modifier isOpen() {
        require(!_isFinal, "Token sale has been finalized");
        require(block.number >= _tokenSaleStartBlock, "Token sale has not started");
        _;
    }

    /**
     * @dev Create new tokens given the ETH sent and the exchange rate.
     */
    function createTokens() external isOpen payable {
        require(block.number < _tokenSaleEndBlock, "Token sale has ended");
        require(msg.value > 0, "Non-zero ETH required to create tokens");

        uint256 tokens = SafeMath.mul(msg.value, _exchangeRate);
        _mint(msg.sender, tokens);
        emit CreateEXT(msg.sender, tokens);
    }

    /**
     * @dev Sends collected eth to configured address
     */
    function finalizeSale() external isOpen {
        // cannot finalize until end block
        require(block.number >= _tokenSaleEndBlock, "Token sale has not ended");

        _isFinal = true;
        _ethAddress.transfer(address(this).balance);
    }

    /**
     * @dev Returns the block number marking the end of the token sale
     */
    function tokenSaleEndBlock() public view returns (uint256) {
        return _tokenSaleEndBlock;
    }

    /**
     * @dev Returns the block number marking the start of the token sale
     */
    function tokenSaleStartBlock() public view returns (uint256) {
        return _tokenSaleStartBlock;
    }

    /**
     * @dev Returns true if the token sale has been finalized
     */
    function isFinal() public view returns (bool) {
        return _isFinal;
    }

    /**
     * @dev Returns the exchange rate of EXT to 1 ETH
     */
    function exchangeRate() public view returns (uint256) {
        return _exchangeRate;
    }

    /**
     * @dev Returns the version of the token
     */
    function version() public view returns (string memory) {
        return _version;
    }

}

