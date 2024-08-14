// src/components/SlideInForm.js
import React from 'react';
import './SlideInForm.css';
import { IoClose } from 'react-icons/io5';

const SlideInForm = ({ isOpen, children, closeForm }) => {
  return (
    <div className={`slide-in-form ${isOpen ? 'open' : ''}`}>
      <div className="form-content">
        <button className="close-button" onClick={closeForm}>
          <IoClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SlideInForm;
