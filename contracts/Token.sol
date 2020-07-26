// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SocialToken is ERC20 {

    string private _version = "1.0";

    constructor() public ERC20("Social", "SCL") {
        // initial supply is 50mil reserved to owner
        // 10**4 is reserved for small give aways
        // tokenCap is 150mil

        // exchange rate is 10000 SCL to 1 eth

        // reserve some for myself for future purposes

        // implement a function that gives away a small fraction of 
        // token for users that can't fund, like 10**4
        
        _mint(msg.sender, 5 * 10**6);
    }

    /**
     * 
     */

    /**
     * @dev Returns the version of the token.
     */
    function version() public view returns (string memory) {
        return _version;
    }

}

