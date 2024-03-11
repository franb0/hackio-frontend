import React, { useState } from 'react';
import Header from './components/header/header';
import Cart from "./components/cart/cart";
import Register from "./components/register/register";
import Footer from "./components/footer/footer";
import PrimarySearchAppBar from "./components/searchBar/searchBar"
// import Login from "./components/login/login";
import Slide from "./components/slide/slide";
import Products from "./components/products/products";
import LoginModal from './components/LoginModal/LoginModal';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<>
            <Header />
            <PrimarySearchAppBar />
            <Slide />
            <Products />
            <Footer />
          </>}>
          </Route>

          <Route path='/register' element={<>
            <Header />
            <Register />
            <Footer />
          </>}>
          </Route>

          <Route path='/cart' element={<>
            <Header />
            <Cart />
            <Footer />
          </>}>

          </Route>

          <Route path='/LoginModal' element={<>
            <Header />
            <button onClick={openLoginModal}>Login</button>
            <Footer />
          </>}>

          </Route>

          

        </Routes>
      </Router>

      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
    </div>
  );
}

export default App;
