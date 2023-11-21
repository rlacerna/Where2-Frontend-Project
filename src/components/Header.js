import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const navbarStyle = {
      backgroundColor: 'transparent',
      borderBottom: '2px solid #ffcc80',
      display: 'flex',
      width: '100%',
      
  };
  
  const linkStyle = {
      color: '#ffffff',
      fontWeight: 'bold',
      textDecoration: 'none',
      padding: '10px 15px',
      fontSize: '18px'
  };
  
  const activeLinkStyle = {
      ...linkStyle,
      borderBottom: '3px solid #bf360c'
  };
  
  return (
      <nav className="navbar navbar-expand-lg" style={navbarStyle}>
          <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <Link to="/" className="nav-link" style={activeLinkStyle} aria-current="page">Home</Link>
                      </li>
                      <li className="nav-item">
                          <Link to="/reviews" className="nav-link" style={linkStyle} aria-current="page">Reviews</Link>
                      </li>
                      <li className="nav-item">
                          <a href="/logout" className="nav-link" style={linkStyle} aria-current="page" onClick={handleLogout}>Logout</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  );
}

export default Header;
