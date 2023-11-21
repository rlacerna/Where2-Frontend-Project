import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      username,
      password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("User registered:", newUser);
        navigate("/");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setName("");
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
      <h2 style={{color: 'white'}}> Sign Up </h2>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "300px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name" style={{color: 'white'}}> Name: </label>

          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            style={inputStyle}
          />
        </div>

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

        <button type="submit" className="buttonsignup" style={buttonStyle}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
