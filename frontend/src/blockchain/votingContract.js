import { getContract } from "./blockchain";

export const createElectionOnChain = async (name, description, startTime, endTime) => {
  const contract = await getContract();
  const tx = await contract.createElection(name, description, startTime, endTime);
  await tx.wait();
  console.log("✅ Election created on blockchain:", tx.hash);
};

export const startElectionOnChain = async (electionId) => {
  const contract = await getContract();
  const tx = await contract.startElection(electionId);
  await tx.wait();
  console.log("✅ Election started on blockchain:", tx.hash);
};

export const finishElectionOnChain = async (electionId) => {
  const contract = await getContract();
  const tx = await contract.finishElection(electionId);
  await tx.wait();
  console.log("✅ Election finished on blockchain:", tx.hash);
};

export const addCandidateOnChain = async (name, party, electionId) => {
  const contract = await getContract();
  const tx = await contract.addCandidate(name, party, electionId);
  await tx.wait();
  console.log("✅ Candidate added:", tx.hash);
};

export const castVoteOnChain = async (electionId, candidateId) => {
  const contract = await getContract();
  const tx = await contract.vote(electionId, candidateId);
  await tx.wait();
  console.log("✅ Vote cast successfully:", tx.hash);
};



export const registerVoterOnChain = async (electionId, voterAddress) => {
  const contract = await getContract();
  const tx = await contract.registerVoter(electionId, voterAddress);
  await tx.wait();
  console.log("✅ Voter registered on blockchain:", tx.hash);
};
