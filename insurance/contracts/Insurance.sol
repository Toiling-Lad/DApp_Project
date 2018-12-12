pragma solidity ^0.4.24;

// contract used for contract side currency exchange rates, used when contract is uploaded
// to testnet or main chain
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
    // keeps track of the 2 insurance types and their properties, one-way or round-trip
    mapping(int => FlightInsurance) public types;
    // keeps track of each individual user's insurance by their address
    mapping(address => Profile) public profile;
    // if a flight has one of these as its status, insurance can't be purchased for it
    string [] noBuy = ['active', 'landed', 'incident', 'diverted', 'unknown', 'cancelled'];
    //reference to the currency conversion contract
    FiatContract public price;
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
        //testnet address
        //price = FiatContract(0x2CDe56E5c8235D6360CCbb0c57Ce248Ca9C80909);
        //mainnet address
        //price = FiatContract(0x8055d0504666e2B6942BeB8D6014c964658Ca591);
        addInsurance("One-Way", 10, 20, 100, "USD$20 or LP100");
        addInsurance("Round-Trip", 30, 30, 150, "USD$30 or LP150");
    }

    // returns $1.00 USD in ETH wei.
    function getDollarRate() constant returns (uint256) {
        // returns $0.01 ETH wei
        uint256 ethCent = price.USD(0);
        // $0.01 * 100 = $1.00
        return ethCent * 100;
    }

    function addInsurance (string name, int awardLP, int costUSD, int costLP, string info) private {
        insuranceTypesCount ++;
        types[insuranceTypesCount] = FlightInsurance(insuranceTypesCount, name, awardLP, costUSD, costLP, info, false);
    }

    function buyWithUSD (int insuranceId, address receiver, int awardLP, string flightId, string status) public payable returns(bool sufficient){
        // Ensure flight status is in an acceptable state, not delayed, cancelled, or in flight
        int costUSD = types[insuranceId].costUSD;
        for(uint i=0;i<noBuy.length;i++) {
          if(keccak256(status) == keccak256(noBuy[i])) {
            msg.sender.transfer(msg.value);
            return false;
          }
        }
        // Logic to check recieved payment against ether exchange rate using an external contracts
        // turn this on when uploading to testnet/mainnet
        // if(getDollarRate()*costUSD > msg.value) {
        //   msg.sender.transfer(msg.value);
        //   return false;
        // }

        // Add insurance to user address's profile
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
      // Ensure flight status is in an acceptable state, not delayed, cancelled, or in flight
        if (profile[msg.sender].points < costLP) return false;
        for(uint i=0;i<noBuy.length;i++) {
          if(keccak256(status) == keccak256(noBuy[i])) {
            msg.sender.transfer(msg.value);
            return false;
          }
        }
        types[insuranceId].active = true;
        profile[msg.sender].activeInsurance = true;
        profile[msg.sender].points -= costLP;
        profile[msg.sender].flightId = flightId;

        emit TransferLP(msg.sender, insuranceId);
        return true;
    }

    function claim (int insuranceId, address receiver, bool activeInsurance, bool delayed, bool canceled, string flightId, uint256 transactionRate) public returns(bool sufficient){
        if (!profile[msg.sender].activeInsurance) return false;
        //use internal exchange rate, turn this on when using testnet/mainnet
        //transactionRate = getDollarRate()

        // payout 200 if flight is delayed
        if (delayed && !profile[msg.sender].delayClaimed) {
            profile[msg.sender].balance += 200;
            profile[receiver].balance -= 200;
            profile[msg.sender].delayClaimed = true;
            msg.sender.transfer(200*transactionRate);
        } else if (canceled && !profile[msg.sender].delayClaimed) {
            // payout 5000 if flight is cancelled and the delayed payout wasn't claimed
            // closes the insurance for the flight since no more possible payout
            profile[msg.sender].balance += 5000;
            profile[receiver].balance -= 5000;
            msg.sender.transfer(5000*transactionRate);
            types[insuranceId].active = false;
            profile[msg.sender].activeInsurance = false;
            profile[msg.sender].flightId = "";
        } else if (canceled && profile[msg.sender].delayClaimed) {
          //payout 4800 if flight is cancelled and delayed payout was delayClaimed
          //also close insurance
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
    // function for manual cancellation of insurance
    function cancelInsurance () public {
      profile[msg.sender].activeInsurance = false;
      profile[msg.sender].flightId = "";
    }
    //donate ether to contract, if more than 5 ether is donated, donater get 50 loyalty points
    function donate() public payable {
      if(msg.value > 5 ether) {
        profile[msg.sender].points += 50;
      }
    }
}
