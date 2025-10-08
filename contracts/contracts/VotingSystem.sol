// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract VotingSystem {
    address public admin;
    uint public electionCount;
    uint public candidateCount;

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
        uint electionId;
        string name;
        string party;
        uint votes;
        string photo;       // optional IPFS hash / URL
        string partyLogo;   // optional IPFS hash / URL
    }

    mapping(uint => Election) public elections;             // electionId => Election
    mapping(uint => Candidate) public candidates;           // candidateId => Candidate
    mapping(uint => mapping(address => bool)) public hasVoted; // electionId => voterAddress => bool

    event ElectionCreated(uint electionId, string name);
    event CandidateAdded(uint candidateId, uint electionId, string name);
    event Voted(uint electionId, uint candidateId, address voter);
    event ElectionEnded(uint electionId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // ---------------- Admin Functions ----------------
    function createElection(
        string memory _name,
        string memory _description,
        uint _startTime,
        uint _endTime
    ) public onlyAdmin {
        electionCount++;
        elections[electionCount] = Election({
            id: electionCount,
            name: _name,
            description: _description,
            startTime: _startTime,
            endTime: _endTime,
            isActive: true
        });
        emit ElectionCreated(electionCount, _name);
    }

    function addCandidate(
        uint _electionId,
        string memory _name,
        string memory _party,
        string memory _photo,
        string memory _partyLogo
    ) public onlyAdmin {
        require(elections[_electionId].id != 0, "Election does not exist");
        candidateCount++;
        candidates[candidateCount] = Candidate({
            id: candidateCount,
            electionId: _electionId,
            name: _name,
            party: _party,
            votes: 0,
            photo: _photo,
            partyLogo: _partyLogo
        });
        emit CandidateAdded(candidateCount, _electionId, _name);
    }

    function endElection(uint _electionId) public onlyAdmin {
        require(elections[_electionId].id != 0, "Election does not exist");
        elections[_electionId].isActive = false;
        emit ElectionEnded(_electionId);
    }

    // ---------------- Voting Functions ----------------
    function vote(uint _electionId, uint _candidateId) public {
        Election memory e = elections[_electionId];
        require(e.id != 0, "Election does not exist");
        require(e.isActive, "Election is not active");
        require(block.timestamp >= e.startTime && block.timestamp <= e.endTime, "Election not open");
        require(!hasVoted[_electionId][msg.sender], "Already voted");
        require(candidates[_candidateId].id != 0, "Candidate does not exist");

        candidates[_candidateId].votes++;
        hasVoted[_electionId][msg.sender] = true;
        emit Voted(_electionId, _candidateId, msg.sender);
    }

    // ---------------- View Functions ----------------
    function getCandidates(uint _electionId) public view returns (Candidate[] memory) {
        uint count = 0;
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].electionId == _electionId) count++;
        }

        Candidate[] memory list = new Candidate[](count);
        uint index = 0;
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].electionId == _electionId) {
                list[index] = candidates[i];
                index++;
            }
        }
        return list;
    }

    function getElection(uint _electionId) public view returns (Election memory) {
        return elections[_electionId];
    }
}
