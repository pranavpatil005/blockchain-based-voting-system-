import { ethers } from "ethers";
import VotingSystemABI from "./VotingSystemABI.json"; 

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // replace after deployment

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not detected");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingSystemABI, signer);

  return contract;
};
