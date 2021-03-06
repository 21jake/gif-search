import React from 'react';
import logo from '../../assets/giphy-logo.svg';
import './style.css';

function Header() {
  return (
    <div className="Header row no-gutters my-4">
      <div className="col-12 text-center">
        <img src={logo} alt="youtube-logo" />
        <h2>Let's search</h2>
      </div>
    </div>
  )
}

export default Header;