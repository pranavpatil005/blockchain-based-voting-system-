// src/voter/Votepage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "./Navbar";
import { castVoteOnChain } from "../blockchain/votingContract";
import { FaWallet } from "react-icons/fa";

const Votepage = () => {
  const [candidates, setCandidates] = useState([]);
  const [electionName, setElectionName] = useState("");
  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [justVoted, setJustVoted] = useState(false);
  const [timer, setTimer] = useState(10);
  const [activeElectionId, setActiveElectionId] = useState(null);
  const [account, setAccount] = useState(null);
  const [networkCorrect, setNetworkCorrect] = useState(false);
  const [walletAllowed, setWalletAllowed] = useState(false);

  const navigate = useNavigate();
  const { userLogout } = useUserAuth();

  const handleLogout = () => {
    userLogout();
    navigate("/");
  };

  // Wallet connect
  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not detected. Please install it.");
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const wallet = accounts[0];

      // Check if wallet is in users table
      const res = await axios.post("http://localhost:5000/api/check-wallet", {
        walletAddress: wallet
      });

      if (!res.data.success) {
        alert(res.data.message);
        setAccount(null);
        setWalletAllowed(false);
        return;
      }

      // Wallet allowed
      setAccount(wallet);
      setWalletAllowed(true);
      localStorage.setItem("voter_id", res.data.voterId); // save voter id
      console.log("Wallet allowed for voting:", res.data.name);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setNetworkCorrect(chainId === "0x7a69");
      if (chainId !== "0x7a69") alert("Switch MetaMask network to Hardhat localhost (31337)");

      window.ethereum.on("chainChanged", (newChainId) => setNetworkCorrect(newChainId === "0x7a69"));
      window.ethereum.on("accountsChanged", (accounts) => setAccount(accounts[0] || null));
    } catch (err) {
      console.error(err);
      alert("Failed to connect MetaMask.");
    }
  };

  // Fetch elections and candidates
  useEffect(() => {
    const fetchElectionAndCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/elections");
        const today = new Date();
        const activeElection = res.data.elections.find((e) => {
          const from = new Date(e.from_date);
          const to = new Date(e.to_date);
          return today >= from && today <= to;
        });

        if (!activeElection) {
          setElectionName("No Active Election Today");
          setCandidates([]);
          return;
        }

        setElectionName(activeElection.name);
        setActiveElectionId(activeElection.id);

        const candRes = await axios.get("http://localhost:5000/api/candidates");
        const filteredCandidates = candRes.data.filter((c) => c.election_id === activeElection.id);
        setCandidates(filteredCandidates);

        const voterId = localStorage.getItem("voter_id");
        if (voterId) {
          const voteCheck = await axios.post("http://localhost:5000/api/check-vote-status", {
            voter_id: voterId,
            election_id: activeElection.id,
          });
          if (voteCheck.data.voted) setHasVoted(true);
        }
      } catch (err) {
        console.error("Error fetching election/candidates:", err);
      }
    };
    fetchElectionAndCandidates();
  }, []);

  // Auto logout timer after voting
  useEffect(() => {
    if (!justVoted) return;
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          handleLogout();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [justVoted]);

  // Confirm vote
  const confirmVote = async () => {
    if (selected === null || !activeElectionId) return alert("Select a candidate first!");
    if (!account) return alert("Connect your MetaMask wallet first!");
    if (!networkCorrect) return alert("Switch MetaMask to Hardhat localhost network (31337)");
    if (!walletAllowed) return alert("Your wallet Address is not Qualified to vote.");

    const candidateId = candidates[selected].id;
    const voterId = localStorage.getItem("voter_id");

    try {
      const tx = await castVoteOnChain(activeElectionId, candidateId);
      console.log("Blockchain TX:", tx);

      const res = await axios.post("http://localhost:5000/api/cast-vote", {
        candidate_id: candidateId,
        voter_id: voterId,
        election_id: activeElectionId,
      });

      if (res.data.success) {
        alert(`✅ Your vote for ${candidates[selected].name} is recorded on blockchain and backend!`);
        setHasVoted(true);
        setJustVoted(true);
      } else {
        alert(`❌ ${res.data.message || "Failed to cast vote"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error during voting — blockchain transaction failed.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Navbar />
      {/* Wallet Button top-right */}
      <div style={{ position: "absolute", top: "100px", right: "-1350px", zIndex: 1000 }}>
        <a
          onClick={connectWallet}
          className={`btn-default btn-wallet ${account ? "connected" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <FaWallet className="wallet-icon" />
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
        </a>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1 style={{ fontWeight: "bold" }}>{electionName}</h1>

        {!hasVoted ? (
          <>
            {candidates.length === 0 ? (
              <p>No candidates for this election</p>
            ) : (
              <>
                <h2>Cast Your Vote</h2>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "20px",
                  width: "60%",
                  margin: "20px auto"
                }}>
                  {candidates.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelected(idx)}
                      style={{
                        border: selected === idx ? "3px solid #2980b9" : "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "15px",
                        textAlign: "center",
                        cursor: walletAllowed ? "pointer" : "not-allowed",
                        backgroundColor: selected === idx ? "#d1f2eb" : "white",
                        boxShadow: selected === idx ? "0 4px 15px rgba(41,128,185,0.4)" : "0 2px 8px rgba(0,0,0,0.1)",
                        transition: "0.3s"
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px" }}>
                        {c.party_logo && (
                          <img src={c.party_logo} alt={c.party} style={{ width: "50px", height: "50px", objectFit: "contain", marginBottom: "5px" }} />
                        )}
                        <span style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          backgroundColor: "#407fddff",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}>{c.party}</span>
                      </div>

                      <img src={c.photo} alt={c.name} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px" }} />
                      <h3>{c.name}</h3>
                    </div>
                  ))}
                </div>

                <button
                  onClick={confirmVote}
                  disabled={!account || !networkCorrect || selected === null || !walletAllowed}
                  style={{
                    backgroundColor: !account || !networkCorrect || selected === null || !walletAllowed ? "gray" : "#2980b9",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "6px",
                    cursor: !account || !networkCorrect || selected === null || !walletAllowed ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    marginTop: "20px"
                  }}
                >
                  🗳️ Cast Your Vote
                </button>
              </>
            )}
          </>
        ) : (
          <div style={{ marginTop: "50px" }}>
            <h1 style={{ fontSize: "28px", color: "#27ae60" }}>
              🎉 Thank You for Voting! 🎉<br />
              Your vote has been recorded on blockchain for <strong>{electionName}</strong>.
            </h1>
            {justVoted && <p>⏳ You will be logged out automatically in <strong>{timer}</strong> seconds...</p>}
            <button
              onClick={handleLogout}
              style={{
                marginTop: "20px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              🚪 Logout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Votepage;
