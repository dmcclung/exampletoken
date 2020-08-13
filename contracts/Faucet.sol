// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.6.0 <0.7.0;

/**
 * TODO: Faucet doesn't get initialized until sale has ended
 * A user can only call the faucet once
 * Faucet amount to each user is configurable
 */
contract Faucet {
    uint256 private _dripTokenQuantity;
    // TODO: array of addresses

    constructor(uint256 dripTokenQuantity) public {
        _dripTokenQuantity = dripTokenQuantity;        
    }

    /**
     * @dev Transfers tokens from faucet supply address to msg.sender
     */
    function dripTokens() external {
        
    }

    // TODO: no fallback or receive default calls

}