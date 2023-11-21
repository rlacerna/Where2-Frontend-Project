import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username,
      password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        console.log("User authenticated:", credentials);
        navigate("/reviews");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setUsername("");
    setPassword("");
  };

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
  
  
  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px', 
    border: '1px solid #ddd' 
  };
  
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#444', 
    color: '#fff', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ color: "white" }}> Log In </h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "300px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="username" style={{color: 'white'}}> Username: </label>

          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password" style={{color: 'white'}}> Password: </label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
