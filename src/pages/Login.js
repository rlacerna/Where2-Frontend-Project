import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(''); // Added state for login status

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.name) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          setUsername(''); // Clear fields only on successful login
          setPassword('');
          navigate("/reviews");
        }
      } else {
        const errorData = await response.json();
        setLoginStatus(errorData.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginStatus('Login failed. Please try again later.');
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2> Login </h2>
      {loginStatus && <p>{loginStatus}</p>} {/* Display login status */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "0 auto" }}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            style={{ width: "90%", padding: "2px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: "90%", padding: "2px" }}
          />
        </div>
        <button type="submit" className='buttonsignup'>Login</button>
      </form>
    </div>
  );
};

export default Login;