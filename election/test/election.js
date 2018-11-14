var Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {
    var election_instance;

    it("initializes with two candidates", function () {
        return Election.deployed().then(function (instance) {
            return instance.candidates_count();
        }).then(function (count) {
            assert.equal(count, 2);
        });
    });

    it("it initializes the candidates with the correct values", function () {
        return Election.deployed().then(function (instance) {
            election_instance = instance;
            return election_instance.candidates(1);
        }).then(function (candidate) {
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Candidate 1", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
            return election_instance.candidates(2);
        }).then(function (candidate) {
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
        });
    });
});