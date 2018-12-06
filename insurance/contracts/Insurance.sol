pragma solidity ^0.4.24;

contract Insurance {
    struct FlightInsurance {
        int id;
        string name;
        bool active;
        int points;
        string cost;
        int amount;
    }

    struct Profile {
        int points;
        int balance;
    }

    mapping(int => FlightInsurance) public types;
    mapping(address => Profile) public profile;

    int public insuranceTypesCount;

    event Transfer(
        address indexed _from, 
        address indexed _to, 
        int _value,
        int indexed _insuranceId
    );

    constructor() public {
        addInsurance("One-Way", 10, "SGD$20 or LP100", 20);
        addInsurance("Round-Trip", 30, "SGD$30 or LP150", 30);
    }

    function addInsurance (string name, int points, string cost, int amount) private {
        insuranceTypesCount ++;
        types[insuranceTypesCount] = FlightInsurance(insuranceTypesCount, name, false, points, cost, amount);
    }

    function buy (int _insuranceId, address receiver, int points, int amount) public{

        types[_insuranceId].active = true;

        // if (profile[msg.sender].balance < amount) return false;
        profile[msg.sender].points += points;
        profile[msg.sender].balance -= amount;
        // profile[receiver] += amount;

        emit Transfer(msg.sender, receiver, amount, _insuranceId);
    }
}