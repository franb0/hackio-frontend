import React, { useState } from 'react'; // Import useState
import './header.css';
import image from "../../multimedia/image.png";
import cart from "../../multimedia/cart.png";
import { Link } from "react-router-dom";
import LoginModal from '../LoginModal/LoginModal'; // Check the file path
import axios from 'axios';

export default function Header() {
  // Create state to manage the login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Function to open the login modal
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  // Function to close the login modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div>
      <header>
        <div className="Logo">
          <Link to="/">
            <img src={image} alt="logo tienda" className="logoImg" />
          </Link>
          <Link to="/" className="hackio">
            Hackio
          </Link>
        </div>
        <nav>
          {/* Use onClick to open the login modal */}
          <Link to="/" className="Nav-Link" onClick={openLoginModal}>
            Login
          </Link>
          <Link to="/cart">
            <img src={cart} alt="Carrito" className="carrito" />
          </Link>
        </nav>
      </header>

      {/* Render the login modal as an overlay */}
      {showLoginModal && (
  <div className="modal">
    <div className="modal-content">
      {/* The LoginModal component content goes here */}
      <LoginModal onClose={closeLoginModal} />
    </div>
  </div>
)}

    </div>
  );
}
