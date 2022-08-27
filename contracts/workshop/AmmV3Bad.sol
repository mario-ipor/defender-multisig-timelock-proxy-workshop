// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.16;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// @dev Example of new version AMM with compatible changes.
contract AmmV3Bad is OwnableUpgradeable, UUPSUpgradeable {

	/// @dev !!! here is a problem !!!
	uint256 private _slotInConflict;

	uint256 private _balance;

	function initialize() public initializer {        
        __Ownable_init();
        __UUPSUpgradeable_init();
	}

	function getVersion() external pure returns(uint256) {
		return 3;
	}

	function getBalance() external view returns(uint256) {
		return _balance;
	}

	function setBalance(uint256 newBalance) external {
		_balance = newBalance;
	}

	//solhint-disable no-empty-blocks
    function _authorizeUpgrade(address) internal override onlyOwner {}
}