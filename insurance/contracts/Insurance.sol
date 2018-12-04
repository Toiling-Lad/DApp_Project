pragma solidity ^0.4.24;

contract Insurance {
    struct FlightInsurance {
        uint id;
        string name;
        bool active;
        uint points;
        string cost;
    }
    mapping(address => bool) public passengers;
    mapping(uint => FlightInsurance) public types;
    uint public insuranceTypesCount;
    uint public totalPoints;

    event boughtInsurance (
        uint indexed _insuranceId
    );

    constructor() public {
        addInsurance("One-Way", 10, "SGD$20 or LP100");
        addInsurance("Round-Trip", 30, "SGD$30 or LP150");
    }

    function addInsurance (string _name, uint _points, string _cost) private {
        insuranceTypesCount ++;
        types[insuranceTypesCount] = FlightInsurance(insuranceTypesCount, _name, false, _points, _cost);
    }

    function buy (uint _insuranceId) public {
        require(!passengers[msg.sender]);

        require(_insuranceId > 0 && _insuranceId <= insuranceTypesCount);

        passengers[msg.sender] = true;

        types[_insuranceId].active = true;
        totalPoints += types[_insuranceId].points;

        emit boughtInsurance(_insuranceId);
    }
}