import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; // Import your CSS file for styling

function Register() {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    if (!formData.name || !formData.email || !formData.password) {
      setErrors({
        name: !formData.name && 'Name is required',
        email: !formData.email && 'Email is required',
        password: !formData.password && 'Password is required',
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      setShowPasswordError(true);
      return;
    }

    // If validation passes, you can submit the data to your server/API
    // For demonstration, we'll just log the data
    console.log('Registration data:', formData);
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Registration Form</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <span className="error">{errors.name}</span>
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
