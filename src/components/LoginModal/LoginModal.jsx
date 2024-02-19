import React, { useState } from 'react';
import './LoginModal.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

export default function LoginModal({ onClose, onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", formData);
      // Verificar si el inicio de sesión fue exitoso
      if (response.data.success) {
        onLogin(); // Llamar a la función onLogin proporcionada desde el componente padre
        onClose(); // Cerrar el modal
      } else {
        setError(response.data.message); // Mostrar el mensaje de error si no fue exitoso
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login. Please try again."); // Manejar errores de red u otros errores
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
      <span className="close" onClick={onClose} style={{fontSize: "40px", color: "red"}}>&times;</span>
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div className="imgcontainer">
              <img src="img_avatar2.png" alt="Avatar" className="avatar" />
            </div>

            <div className="container">
              <label htmlFor="username"><b>Username</b></label>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label htmlFor="password"><b>Password</b></label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {/* Botón para redirigir al usuario a la página de registro */}
              <Link to="/register">
                <button type="button">Register</button>
              </Link>
              <button type="submit">Login</button>
              <span className="error">{error}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
