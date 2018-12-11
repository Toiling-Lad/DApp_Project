pragma solidity ^0.4.24;

contract Insurance {
    struct FlightInsurance {
        int insuranceId;
        string name;
        int awardLP;
        int costUSD;
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
        bool delayClaimed;
    }
    mapping(int => FlightInsurance) public types;
    mapping(address => Profile) public profile;
    string [] noBuy = ['active', 'landed', 'incident', 'diverted', 'unknown', 'cancelled'];
    int public insuranceTypesCount;

    event TransferUSD(
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
        addInsurance("One-Way", 10, 20, 100, "USD$20 or LP100");
        addInsurance("Round-Trip", 30, 30, 150, "USD$30 or LP150");
    }

    function addInsurance (string name, int awardLP, int costUSD, int costLP, string info) private {
        insuranceTypesCount ++;
        types[insuranceTypesCount] = FlightInsurance(insuranceTypesCount, name, awardLP, costUSD, costLP, info, false);
    }

    function buyWithUSD (int insuranceId, address receiver, int awardLP, string flightId, string status) public payable returns(bool sufficient){
        // ensure enough ether is being sent for the contract, static values for now
        for(uint i=0;i<noBuy.length;i++) {
          if(keccak256(status) == keccak256(noBuy[i])) {
            msg.sender.transfer(msg.value);
            return false;
          }
        }
        int costUSD = types[insuranceId].costUSD;
        types[insuranceId].active = true;
        profile[msg.sender].activeInsurance = true;
        profile[msg.sender].points += awardLP;
        profile[msg.sender].balance -= costUSD;
        profile[msg.sender].flightId = flightId;
        profile[receiver].balance += costUSD;
        profile[msg.sender].insuranceType = types[insuranceId].name;
        profile[msg.sender].delayClaimed = false;
        emit TransferUSD(msg.sender, receiver, costUSD, insuranceId);
        return true;
    }

    function buyWithLP (int insuranceId, int costLP, string flightId, string status) public returns(bool sufficient){
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
        if (delayed && !profile[msg.sender].delayClaimed) {
            profile[msg.sender].balance += 200;
            profile[receiver].balance -= 200;
            profile[msg.sender].delayClaimed = true;
            msg.sender.transfer(200*transactionRate);
        } else if (canceled && !profile[msg.sender].delayClaimed) {
            profile[msg.sender].balance += 5000;
            profile[receiver].balance -= 5000;
            msg.sender.transfer(5000*transactionRate);
            types[insuranceId].active = false;
            profile[msg.sender].activeInsurance = false;
            profile[msg.sender].flightId = "";
        } else if (canceled && profile[msg.sender].delayClaimed) {
            profile[msg.sender].balance += 4800;
            profile[receiver].balance -= 4800;
            msg.sender.transfer(4800*transactionRate);
            types[insuranceId].active = false;
            profile[msg.sender].activeInsurance = false;
            profile[msg.sender].flightId = "";
        }

        // emit TransferLP(msg.sender, insuranceId);
        return true;
    }
    function cancelInsurance () public {
      profile[msg.sender].activeInsurance = false;
      profile[msg.sender].flightId = "";
    }
    function donate() public payable {

    }
}
