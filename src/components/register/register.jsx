import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; // Import your CSS file for styling

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [showPasswordError, setShowPasswordError] = useState(false); // State for password error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to validate the password
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        return passwordRegex.test(password);
    };

    // Event handler for password input onBlur
    const handlePasswordBlur = () => {
        if (formData.password && !validatePassword(formData.password)) {
            setShowPasswordError(true);
        } else {
            setShowPasswordError(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form data
        if (!formData.username || !formData.email || !formData.password) {
            setErrors({
                username: !formData.username && 'Username is required',
                email: !formData.email && 'Email is required',
                password: !formData.password && 'Password is required',
            });
            return;
        }

        if (!validatePassword(formData.password)) {
            setShowPasswordError(true);
            return;
        }

        try {
            // Send registration data to the backend using Axios
            const response = await axios.post('http://localhost:8080/register', formData);
            console.log('Registration successful:', response.data);
            // Show alert upon successful registration
            alert('Registration successful!');
            // Redirect the user to the home page after successful registration
            window.location.href = '/'; // Redirigir al usuario a la página de inicio
        } catch (error) {
            console.error('Error during registration:', error);
            // Optionally, you can handle registration errors and display appropriate messages to the user
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-heading">Registration Form</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Your Username"
                    />
                    <span className="error">{errors.username}</span>
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                    />
                    <span className="error">{errors.email}</span>
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handlePasswordBlur}
                        placeholder="Choose a Password"
                    />
                    <span className="error">{errors.password}</span>
                    {showPasswordError && (
                        <p className="password-error">
                            Password must be at least 8 characters long and contain at least one capital letter and one special character.
                        </p>
                    )}
                </div>
                <button className="register-button" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;