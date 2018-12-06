pragma solidity ^0.4.24;

contract Insurance {
    struct FlightInsurance {
        uint id;
        string name;
        bool active;
        uint points;
        string cost;
        uint amount;
    }

    struct Profile {
        uint points;
        uint balance;
    }

    mapping(uint => FlightInsurance) public types;
    mapping(address => Profile) public profile;

    uint public insuranceTypesCount;

    event Transfer(
        address indexed _from, 
        address indexed _to, 
        uint256 _value,
        uint indexed _insuranceId
    );

    constructor() public {
        addInsurance("One-Way", 10, "SGD$20 or LP100", 20);
        addInsurance("Round-Trip", 30, "SGD$30 or LP150", 30);
    }

    function addInsurance (string _name, uint _points, string _cost, uint _amount) private {
        insuranceTypesCount ++;
        types[insuranceTypesCount] = FlightInsurance(insuranceTypesCount, _name, false, _points, _cost, _amount);
    }

    function buy (uint _insuranceId, address receiver, uint amount, uint points) public returns(bool sufficient) {

        types[_insuranceId].active = true;


        // if (profile[msg.sender].balance < amount) return false;
        profile[msg.sender].balance -= amount;
        profile[msg.sender].points += points;
        // profile[receiver] += amount;

        emit Transfer(msg.sender, receiver, amount, _insuranceId);
        return true;
    }
}