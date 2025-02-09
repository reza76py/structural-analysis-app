import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles_navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2 className="logo">Structural Analysis</h2>
            <ul className="navLinks">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/structure-input">Define Structure</Link></li>
                <li><Link to="/analysis">Analysis</Link></li>
                <li><Link to="/results">Results</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
