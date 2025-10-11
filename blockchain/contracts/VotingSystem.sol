// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VotingSystem {
    address public admin;
    uint public electionCount;

    constructor() {
        admin = msg.sender;
    }

    struct Election {
        uint id;
        string name;
        string description;
        uint startTime;
        uint endTime;
        bool isActive;
    }

    struct Candidate {
        uint id;
        string name;
        string party;
        uint electionId;
        uint voteCount;
    }

    struct Voter {
        bool exists;
        bool hasVoted;
    }

    mapping(uint => Election) public elections;
    mapping(uint => Candidate) public candidates;
    mapping(uint => mapping(address => Voter)) public voters; // electionId => voterAddress => Voter
    mapping(uint => uint[]) public electionCandidates; // electionId => candidateIds

    uint public candidateCount;
     
    // -------------------------------
    // Election functions
    // -------------------------------
    function createElection(string memory _name, string memory _description, uint _startTime, uint _endTime) public {
        require(msg.sender == admin, "Only admin");
        electionCount++;
        elections[electionCount] = Election(electionCount, _name, _description, _startTime, _endTime, false);
    }

    function startElection(uint _electionId) public {
        require(msg.sender == admin, "Only admin");
        elections[_electionId].isActive = true;
    }

    function finishElection(uint _electionId) public {
        require(msg.sender == admin, "Only admin");
        elections[_electionId].isActive = false;
    }

    // -------------------------------
    // Candidate functions
    // -------------------------------
    function addCandidate(uint _electionId, string memory _name, string memory _party) public {
        require(msg.sender == admin, "Only admin");
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, _party, _electionId, 0);
        electionCandidates[_electionId].push(candidateCount);
    }

    // -------------------------------
    // Voter functions
    // -------------------------------
    function registerVoter(uint _electionId, address _voter) public {
        require(msg.sender == admin, "Only admin");
        voters[_electionId][_voter] = Voter(true, false);
    }

    // -------------------------------
    // Voting
    // -------------------------------
    function vote(uint _electionId, uint _candidateId) public {
       
        

        voters[_electionId][msg.sender].hasVoted = true;
        candidates[_candidateId].voteCount++;
    }

    // -------------------------------
    // Get candidates of an election
    // -------------------------------
    function getCandidates(uint _electionId) public view returns (Candidate[] memory) {
        uint[] memory candIds = electionCandidates[_electionId];
        Candidate[] memory cands = new Candidate[](candIds.length);
        for(uint i = 0; i < candIds.length; i++){
            cands[i] = candidates[candIds[i]];
        }
        return cands;
    }
}
