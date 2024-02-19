import React from 'react';
import './LoginModal.css'; // Create a CSS file for modal styles
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

export default function LoginModal({ onClose }) {
    const handleCancelClick = () => {
        onClose(); // Close the modal when Cancel is clicked
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="login-box">
                    <form action="action_page.php" method="post">
                        {/* Your login form content here */}
                        <div className="imgcontainer">
                            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                        </div>

                        <div className="container">
                            <label htmlFor="uname"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" name="uname" required />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" required />

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
                                <Link to="/register">Create an Account</Link> {/* Add the Create Account Link */}
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
        </div>
    );
}
