import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useLocation } from 'react-router-dom';

export const Navbar = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const location = useLocation();
  return (
    <div className="navbar">
      <div className="container">
        <h1 style={{ marginLeft: '1rem', color: '#00d8ff' }}>Defi</h1>
        <ul className={open ? 'nav active' : 'nav'}>
          {/* <li className="nav-item">
            <Link to="/">Community</Link>
          </li> */}
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          {location.pathname === '/login' ||
          location.pathname === '/defi' ? null : (
            <li className="nav-item">
              <Link to="/login" className="btn">
                Login
              </Link>
            </li>
          )}
          {location.pathname === '/defi' ? null : (
            <li className="nav-item">
              <Link to="/defi" className="btn">
                Use Defi
              </Link>
            </li>
          )}
        </ul>
        <div className="hamburger" onClick={handleOpen}>
          {open ? (
            <AiOutlineClose color="#f4eeff" size={'2rem'} />
          ) : (
            <AiOutlineMenu color="#f4eeff" size={'2rem'} />
          )}
        </div>
      </div>
    </div>
  );
};
