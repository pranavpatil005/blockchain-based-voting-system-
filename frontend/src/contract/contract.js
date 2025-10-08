// frontend/src/contract/contract.js
import { ethers } from "ethers";

export const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCandidates",
    "outputs": [
      { "components": [
        { "internalType": "string", "name": "name", "type": "string" },
        { "internalType": "uint256", "name": "votes", "type": "uint256" }
      ], "internalType": "struct Candidate[]", "name": "", "type": "tuple[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "candidateId", "type": "uint256" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
