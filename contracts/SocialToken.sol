// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SocialToken is ERC20 {

    string private _version = "1.0";

    constructor() public ERC20("Social", "SCL") {
        _mint(msg.sender, 5 * 10**6);
    }

    /**
     * @dev Returns the version of the token.
     */
    function version() public view returns (string memory) {
        return _version;
    }

}

