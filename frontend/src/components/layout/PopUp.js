import React from 'react';
import '../../styles/components/layout/popup.css';

const PopUp = ({ status, message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className={`popup ${status === 200 ? 'green' : 'red'}`}>
        <div className="popup-content">
          <div className="popup-message">{message}</div>
          <button className={`popup-button ${status === 200 ? 'green-button' : 'red-button'}`} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
