import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <div className="login-box">
        <form action="action_page.php" method="post">
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
            <button type="button" className="cancelbtn">Cancel</button>
            <span className="psw"><a href="#">Forgot password?</a></span>
            <p>Don't have an account? <Link to="/register">Create an Account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
