pragma solidity ^0.4.24;
contract FiatContract {
  function ETH(uint _id) constant returns (uint256);
  function USD(uint _id) constant returns (uint256);
  function EUR(uint _id) constant returns (uint256);
  function GBP(uint _id) constant returns (uint256);
  function updatedAt(uint _id) constant returns (uint);
}

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
        string flightId;
        string insuranceType;
    }
    FiatContract public price;
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
        price = FiatContract(0x2CDe56E5c8235D6360CCbb0c57Ce248Ca9C80909);
    }

    // returns $5.00 USD in ETH wei.

    function addInsurance (string name, int awardLP, int costSGD, int costLP, string info) private {
        insuranceTypesCount ++;
        types[insuranceTypesCount] = FlightInsurance(insuranceTypesCount, name, awardLP, costSGD, costLP, info, false);
    }

    function buyWithSGD (int insuranceId, address receiver, int awardLP, string flightId) public payable returns(bool sufficient){
        // ensure enough ether is being sent for the contract, static values for now
        int costSGD = types[insuranceId].costSGD;
        types[insuranceId].active = true;
        profile[msg.sender].activeInsurance = true;
        profile[msg.sender].points += awardLP;
        profile[msg.sender].balance -= costSGD;
        profile[msg.sender].flightId = flightId;
        profile[receiver].balance += costSGD;
        profile[msg.sender].insuranceType = types[insuranceId].name;

        emit TransferSGD(msg.sender, receiver, costSGD, insuranceId);
        return true;
    }

    function buyWithLP (int insuranceId, int costLP, string flightId) public returns(bool sufficient){
        if (profile[msg.sender].points < costLP) return false;

        types[insuranceId].active = true;
        profile[msg.sender].activeInsurance = true;
        profile[msg.sender].points -= costLP;
        profile[msg.sender].flightId = flightId;

        emit TransferLP(msg.sender, insuranceId);
        return true;
    }

    function claim (int insuranceId, address receiver, bool activeInsurance, bool delayed, bool canceled, string flightId, uint256 transactionRate) public returns(bool sufficient){
        if (!profile[msg.sender].activeInsurance) return false;
        msg.sender.transfer(20*transactionRate);
        if (delayed) {
            profile[msg.sender].balance += 200;
            profile[receiver].balance -= 200;
        } else if (canceled) {
            profile[msg.sender].balance += 5000;
            profile[receiver].balance -= 5000;
        }

        types[insuranceId].active = false;
        profile[msg.sender].activeInsurance = false;
        profile[msg.sender].flightId = "";
        // emit TransferLP(msg.sender, insuranceId);
        return true;
    }
}
