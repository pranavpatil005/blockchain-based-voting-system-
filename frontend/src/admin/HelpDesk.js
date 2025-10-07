// import React, { useState } from 'react';
// import '../css/HelpDesk.css';

// const HelpDesk = () => {
//   const [queries] = useState([
//     {
//       id: 1,
//       question: 'How to register a new voter?',
//       answer: 'Go to the Voters tab → Click on "Add Voter" → Fill out the details and submit.'
//     },
//     {
//       id: 2,
//       question: 'How to create a new election?',
//       answer: 'Click the "Create Election" tab → Fill in the election details and configure candidates.'
//     },
//     {
//       id: 3,
//       question: 'How to reset admin password?',
//       answer: 'Navigate to Settings → Security → Reset Password section.'
//     },
//     {
//       id: 4,
//       question: 'How to check blockchain transaction logs?',
//       answer: 'Go to the Blockchain Explorer tab to view real-time transactions and blocks.'
//     }
//   ]);

//   const [activeId, setActiveId] = useState(null);

//   const toggleAnswer = (id) => {
//     setActiveId(activeId === id ? null : id);
//   };

//   return (
//     <div className="helpdesk-container">
//       <h2>Help Desk & FAQs</h2>
//       <p className="help-subtitle">Common questions and admin support assistance</p>

//       <div className="faq-list">
//         {queries.map((item) => (
//           <div key={item.id} className="faq-item">
//             <div className="faq-question" onClick={() => toggleAnswer(item.id)}>
//               <span>{item.question}</span>
//               <span>{activeId === item.id ? '−' : '+'}</span>
//             </div>
//             {activeId === item.id && <div className="faq-answer">{item.answer}</div>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HelpDesk;
import React, { useState } from 'react';
import '../css/HelpDesk.css';

const HelpDesk = () => {
  const [queries] = useState([
    {
      id: 1,
      question: 'How to add a new voter?',
      answer: 'Go to the Voters tab → Click "Add Voter" → Fill out the required details and submit.'
    },
    {
      id: 2,
      question: 'How to create a new election?',
      answer: 'Navigate to the Elections tab → Click "Create Election" → Enter election details and save.'
    },
    {
      id: 3,
      question: 'How to check blockchain transaction logs?',
      answer: 'Go to the Blockchain Explorer tab to view real-time transactions and blocks.'
    },
    {
      id: 4,
      question: 'How to approve or reject candidates?',
      answer: 'In the Candidates tab, select the candidate → Click "Approve" or "Reject" button to update status.'
    },
    {
      id: 5,
      question: 'How to reset admin password?',
      answer: 'Go to Admin Login → Click on forgot password → Update your admin password.'
    }
  ]);

  const [activeId, setActiveId] = useState(null);

  const toggleAnswer = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
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
            <div
              className={`faq-answer ${activeId === item.id ? 'open' : ''}`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpDesk;
