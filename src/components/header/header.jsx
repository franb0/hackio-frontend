import React, { useState } from 'react';
import './header.css';
import image from "../../multimedia/image.png";
import cart from "../../multimedia/cart.png";
import LoginModal from '../LoginModal/LoginModal'; 

export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <header>
        <div className="Logo">
          <img src={image} alt="logo tienda" className="logoImg" />
          <span className="hackio">Hackio</span>
        </div>
        <nav>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={openLoginModal}>Login</button>
          )}
          <img src={cart} alt="Carrito" className="carrito" />
        </nav>
      </header>

      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <LoginModal onClose={closeLoginModal} onLogin={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
}
