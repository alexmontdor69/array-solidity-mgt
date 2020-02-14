pragma solidity ^0.5.0;

contract AccessArray {
    string public name;
    uint public numberItems;

    mapping (uint => Item) public items;

    constructor() public {
        name = "Demo access array within mapping type memory";

// Definition  of 2 items 
        items[0].id = 0;
        items[0].name = "first entry";
        items[0].accounts.push(0xdaBEC0c136EC139686d29f7CCD4C2989fEc83e1a);
        items[0].accounts.push(0x29a228B29C4b90F4F9542f85bBC725203025C8CD);
        items[0].accounts.push(0xF6b34B0D8952E381eD43c849FdD148CBEEA0bDa0);


// this part could be improved
        items[1].id = 1;
        items[1].name = "second entry";
        items[1].accounts.push(0x2b3A5Bd2441ABc9dc84Cf7fC4C770bAeF0D6d6fd);
        items[1].accounts.push(0x3e3F6622854Ec2E4fCD9cae612aa068d1f8aDD19);
        items[1].accounts.push(0x93029b2A3a2ff092E9f92b00E6179C99Ad698A16);

        numberItems= 2;
    }

    struct Item {
        uint id;
        string name;
        address payable[] accounts;
    }
/** 
 */
    function getNumberItemAccounts (uint index) public returns (uint) {
        return items[index].accounts.length;
    }

/** Get 1 account defined by its index from an item defined by its index
 */
    function getItemAccount(uint itemIndex, uint accountIndex) public returns (address payable){
        return items[itemIndex].accounts[accountIndex];
    }
}