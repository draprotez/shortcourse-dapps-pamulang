// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {

    address public owner; // owner bisa diakses publik
    uint256 private storedValue;

    event ValueUpdated(uint256 newValue);

    constructor() {
        owner = msg.sender; // deployer jadi owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Bukan owner!");
        _;
    }

    function setValue(uint256 _value) public onlyOwner {
        storedValue = _value;
        emit ValueUpdated(_value);
    }

    function getValue() public view returns (uint256) {
        return storedValue;
    }
}
