import React from "react";
import { Link } from "react-router-dom";

const formContainerStyle = {
  textAlign: 'center',
  padding: '20px',
  maxWidth: '400px',
  backgroundColor: 'transparent',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'absolute', 
  left: '50%', 
  top: '50%', 
  transform: 'translate(-50%, -50%)'
};


const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#444', 
  color: 'white', 
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const Home = () => {
  return (
    <div style={formContainerStyle}>
      <div className="home-container">
        <h1 className="home-description" style={{color: 'white'}}> Where-2-Review </h1>
        <div className="home-button">
          <button className="login-button" style={buttonStyle}>
            <Link to="/login" className="login-btn" style={{color: 'white'}}>
              Log In
            </Link>
          </button>
          <button className="signup-button" style={buttonStyle}>
            <Link to="/signup" className="signup-link" style={{color: 'white'}}>
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
