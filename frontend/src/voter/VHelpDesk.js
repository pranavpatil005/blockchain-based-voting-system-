import React, { useState } from 'react';
import '../css/HelpDesk.css';
import Navbar from "./Navbar";



const HelpDesk = () => {
  const [queries] = useState([
    {
      id: 1,
      question: 'How to cast Vote?',
      answer: 'Go to the Homepage → Select the Candidate to Vote → Click On Cast Vote → "Submit Vote"'
    },
    {
      id: 2,
      question: 'How to View Candidates?',
      answer: 'Homepage → Select the Candidates option from the Navigation Panel'
    },
    {
      id: 3,
      question: 'How to check blockchain transaction logs?',
      answer: 'Go to the Blockchain Explorer tab to view real-time transactions and blocks.'
    },
    {
      id: 4,
      question: 'How to View Results?',
      answer: 'Scroll down on the Dashboard.'
    },
    {
      id: 5,
      question: 'How to reset User password?',
      answer: 'Go to Voter Login → Click on forgot password → Update your user password.'
    }
  ]);

  const [activeId, setActiveId] = useState(null);

  const toggleAnswer = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
      <div
      className="homepage"
      style={{
        paddingTop: "90px",  
      }}
    >
     <Navbar />


    <div className="helpdesk-container">
      <h2>Help Desk & FAQs</h2>
      <p className="help-subtitle">Quick admin guidance and support</p>

      <div className="faq-list">
        {queries.map((item) => (
          <div key={item.id} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(item.id)}>
              <span>{item.question}</span>
              <span>{activeId === item.id ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeId === item.id ? 'open' : ''}`}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
     </div>
  );
};

export default HelpDesk;
