import React, { useState } from 'react';
import PopUp from "../components/layout/PopUp"
import axios from 'axios';
import { Navigate } from "react-router-dom";
import "../styles/components/pages/loginPage.css";


const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupStatus, setPopupStatus] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogged, setLogged] = useState(false);

    /* Handle register mode */
    const toggleRegisterMode = () => {
        setIsRegistering(!isRegistering);
    };

    /* Handle email logic */
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    /* Handle password logic */
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    /* Handle username  */
    const handleUsernameChange = (e) => {
        const inputValue = e.target.value;
        const regex = /^[A-Za-z\s]+$/;

        if (regex.test(inputValue)) {
            setUsername(inputValue);
        }
        else {
            alert('El nombre debe contener solo letras y espacios');
        }
    };

    /* Handle login logic */
    const handleLogin = async () => {
        if (email === '' || password === '') {
            handlePopUp(505, "Completa todos los campos!");

        } else {
            const apiUrl = process.env.REACT_APP_API_URL + '/login';
            setLoading(true);
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            
            try {
                const response = await axios.post(apiUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                });
                setLoading(false);
                if (response.status === 200) {
                    setLogged(true);
                }
            } catch (error) {
                handlePopUp(error.response.status, error.response.data.message);
                setLoading(false);
            }
        }
    };

    /* Handle register logic */
    const handleRegister = async () => {
        if (email === '' || password === '' || username === '') {
            handlePopUp(505, "Completa todos los campos!");

        }
        else {
            const apiUrl = process.env.REACT_APP_API_URL + '/registrar';
            setLoading(true);
            const formData = new FormData();
            formData.append('email', email);
            formData.append('usuario', username);
            formData.append('password', password);
            try {
                const response = await axios.post(apiUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                });
                setLoading(false);
                if (response.status === 200) {
                    setLogged(true);
                }
            } catch (error) {
                handlePopUp(error.response.status, error.response.data.message);
                setLoading(false);
            }
        }
    }

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

    return (

        <div className="login-page">
            {popupVisible && (
                <PopUp status={popupStatus} message={popupMessage} onClose={handlePopupClose} />
            )}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
            {isLogged && (
                <Navigate to="/" />
            )}
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                {isRegistering && (
                    <input
                        type="text"
                        placeholder="Nombre Completo"
                        value={username}
                        required
                        onChange={handleUsernameChange}
                    />
                )}
                <input
                    type="text"
                    placeholder="Mail"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
                <div className="password-input">
                    <input
                        type="password"
                        required
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button onClick={isRegistering ? handleRegister : handleLogin}>
                    {isRegistering ? 'Registrar' : 'Iniciar Sesión'}
                </button>
                <p onClick={toggleRegisterMode}>
                    {isRegistering
                        ? '¿Ya tienes una cuenta? Iniciar Sesión'
                        : '¿No tienes una cuenta? Registrar'}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
