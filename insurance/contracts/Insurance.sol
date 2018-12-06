pragma solidity ^0.4.24;

contract Insurance {
    struct FlightInsurance {
        int insuranceId;
        string name;
        int awardLP;
        int costSGD;
        int costLP;
        string info;
        bool active;
    }

    struct Profile {
        int points;
        int balance;
        bool activeInsurance;
    }

    mapping(int => FlightInsurance) public types;
    mapping(address => Profile) public profile;

    int public insuranceTypesCount;

    event TransferSGD(
        address indexed _from, 
        address indexed _to, 
        int _value,
        int indexed insuranceinsuranceId
    );

    event TransferLP(
        address indexed _from, 
        int indexed insuranceinsuranceId
    );

    constructor() public {
        addInsurance("One-Way", 10, 20, 100, "SGD$20 or LP100");
        addInsurance("Round-Trip", 30, 30, 150, "SGD$30 or LP150");
    }

    function addInsurance (string name, int awardLP, int costSGD, int costLP, string info) private {
        insuranceTypesCount ++;
        types[insuranceTypesCount] = FlightInsurance(insuranceTypesCount, name, awardLP, costSGD, costLP, info, false);
    }

    function buyWithSGD (int insuranceId, address receiver, int awardLP, int costSGD) public returns(bool sufficient){
        // if (profile[msg.sender].balance < costSGD) return false;
        types[insuranceId].active = true;
        profile[msg.sender].activeInsurance = true;
        profile[msg.sender].points += awardLP;
        profile[msg.sender].balance -= costSGD;
        profile[receiver].balance += costSGD;

        emit TransferSGD(msg.sender, receiver, costSGD, insuranceId);
        return true;
    }

    function buyWithLP (int insuranceId, int costLP) public returns(bool sufficient){
        if (profile[msg.sender].points < costLP) return false;

        types[insuranceId].active = true;
        profile[msg.sender].points -= costLP;

        emit TransferLP(msg.sender, insuranceId);
        return true;
    }

    function claim (address receiver, bool activeInsurance, bool delayed, bool canceled) public returns(bool sufficient){
        if (!profile[msg.sender].activeInsurance) return false;
        
        if (delayed) {
            profile[msg.sender].balance += 200;
            profile[receiver].balance -= 200;
        } else if (canceled) { 
            profile[msg.sender].balance += 5000;
            profile[receiver].balance -= 5000;
        }

        profile[msg.sender].activeInsurance = false;
        // emit TransferLP(msg.sender, insuranceId);
        return true;
    }
}