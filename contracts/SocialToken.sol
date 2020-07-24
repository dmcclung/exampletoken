// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SocialToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Social", "SCL") {
        _mint(msg.sender, initialSupply);
    }

}

