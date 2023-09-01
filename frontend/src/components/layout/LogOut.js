import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import '../../styles/components/layout/logout.css'
import axios from 'axios';
import { Navigate } from "react-router-dom";
import PopUp from "../../components/layout/PopUp"

function LogOut() {

    const [logout, setLogOut] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupStatus, setPopupStatus] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [loading, setLoading] = useState(false);

    /* Handle PopUp Close*/
    const handlePopupClose = () => {
        setPopupVisible(false);
    };

    /* Handle PopUp component*/
    const handlePopUp = (status, message) => {
        setPopupStatus(status);
        setPopupMessage(message);
        setPopupVisible(true);
    }
    /* Handle login logic */
    const handleLogout = async () => {
        const apiUrl = process.env.REACT_APP_API_URL + '/logout';
        setLoading(true);

        try {
          const response = await axios.post(apiUrl, null, {           
            withCredentials : true
          });
            setLoading(false);
            if (response.status === 200) {
                setLogOut(true);
            }
        } catch (error) {
            handlePopUp(error.response.status, error.response.data.message);
            setLoading(false);
        }
    };

  return (
    <div>
      {popupVisible && (
        <PopUp status={popupStatus} message={popupMessage} onClose={handlePopupClose} />
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      {logout && (
        <Navigate to="/login" />
      )}
      <div className='logout-container'>
        <FiLogOut className='logout-icon' title="Cerrar sesión" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default LogOut;
