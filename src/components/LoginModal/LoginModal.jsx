import React, { useState } from 'react';
import './LoginModal.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginModal({ onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCancelClick = () => {
        onClose(); // Close the modal when Cancel is clicked
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        try {
            // Send a POST request to the backend with the login credentials
            const response = await axios.post("http://localhost:8080/login", {
                username: username,
                password: password
            });
            // Check the response from the backend
            if (response.data.success) {
                // If login is successful, close the modal
                onClose();
            } else {
                // If login fails, display the error message from the backend
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle any errors that occur during the login process
            setErrorMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <div className="imgcontainer">
                            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                        </div>

                        <div className="container">
                            <label htmlFor="uname"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" name="uname" required
                                value={username} onChange={(e) => setUsername(e.target.value)} />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" required
                                value={password} onChange={(e) => setPassword(e.target.value)} />

                            <button type="submit">Login</button>
                            <label>
                                <input type="checkbox" checked={true} name="remember" /> Remember me
                            </label>
                        </div>

                        <div className="container" style={{ backgroundColor: "#3b3b3b" }}>
                            <button type="button" className="cancelbtn" onClick={handleCancelClick}>
                                Cancel
                            </button>
                            <span className="psw">
                                <Link to="/register">Create an Account</Link>
                            </span>
                            <span className="psw">
                                <button onClick={() => { /* Handle Forgot Password action here */ }}>
                                    Forgot password?
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            {/* Display the error message if login fails */}
            {errorMessage && <div className="login-message error">{errorMessage}</div>}
        </div>
    );
}
