import React, { useState } from 'react';
import parse from 'html-react-parser';
import './faqs.css';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      <div className="question-container" onClick={toggleAccordion}>
        <div className="question">{question}</div>
        <div className={`toggle-icon ${isOpen ? 'minus' : 'plus'}`}>{isOpen ? '-' : '+'}</div>
      </div>
      {isOpen && <><div className='ans-line' /><div className="answer">{parse(answer)}</div></>}
    </div>
  );
};

export default FaqItem;