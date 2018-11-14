pragma solidity ^0.4.24;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;

    uint public candidates_count;

    function Election () public {
        add_candidate("Candidate 1");
        add_candidate("Candidate 2");
    }

    function add_candidate (string _name) private {
        candidates_count++;
        candidates[candidates_count] = Candidate(candidates_count, _name, 0);
    }
}